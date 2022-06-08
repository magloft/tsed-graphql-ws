import { ApolloService } from '@tsed/apollo'
import { AfterListen, Logger } from '@tsed/common'
import { Configuration, Inject, Injectable } from '@tsed/di'
import { CloseCode, makeServer } from 'graphql-ws'
import { Server as HttpServer } from 'http'
import { WebSocketServer } from 'ws'
import { GraphQLWSSettings } from '../interfaces/GraphQLWSSettings'

@Injectable()
export class GraphQLWSService implements AfterListen {
  @Inject() protected logger: Logger
  @Inject(HttpServer) protected httpServer!: HttpServer
  @Inject(ApolloService) protected apolloService!: ApolloService
  @Configuration() protected configuration: Configuration

  get settings(): GraphQLWSSettings {
    return this.configuration.get<GraphQLWSSettings>('graphqlws', {})
  }

  $afterListen() {
    const instanceId = this.settings.instance ?? 'default'
    const instance = this.apolloService.get(`typegraphql-${instanceId}`)
    if (!instance) {
      this.logger.error(`[graphql-ws] Unable to find graphql instance for '${instanceId}'`)
      return
    }
    const wsServer = new WebSocketServer({ noServer: true })
    const schema = this.apolloService.getSchema(`typegraphql-${instanceId}`)
    if (!schema) {
      this.logger.error(`[graphql-ws] Unable to find graphql schema for '${instanceId}'`)
      return
    }
    const baseServer = makeServer({ schema })
    this.httpServer.on('upgrade', (request, socket, head) => {
      const pathname = request.url ?? '/'
      if (pathname !== instance.graphqlPath) { return socket.destroy() }
      return wsServer.handleUpgrade(request, socket, head, (client) => {
        wsServer.emit('connection', client, request)
      })
    })

    wsServer.on('connection', (socket, request) => {
      const closed = baseServer.opened({
        protocol: socket.protocol,
        send: (data) => new Promise((resolve, reject) => {
          socket.send(data, (err) => (err ? reject(err) : resolve()))
        }),
        close: (code, reason) => socket.close(code, reason),
        onMessage: (cb) =>
          socket.on('message', async (event) => {
            try {
              await cb(event.toString())
            } catch (err) {
              socket.close(CloseCode.InternalServerError, (err as Error).message)
            }
          })
      }, { socket, request })
      socket.once('close', (code, buffer) => {
        const reason = buffer.toString('utf8')
        console.log('close', reason)
        return closed(code, reason)
      })
    })
  }
}
