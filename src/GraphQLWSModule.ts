import { AfterListen } from '@tsed/common'
import { Configuration, Inject, InjectorService, Module } from '@tsed/di'
import { GraphQLWSSettings } from './interfaces/GraphQLWSSettings'
import { GraphQLWSService } from './services/GraphQLWSService'

@Module()
export class GraphQLWSModule implements AfterListen {
  @Inject() protected service: GraphQLWSService
  @Inject() protected injector: InjectorService
  @Configuration() protected configuration: Configuration

  get settings(): GraphQLWSSettings {
    return this.configuration.get<GraphQLWSSettings>('graphqlws', {})
  }

  $afterListen(): Promise<any> | void {
    const { instance } = this.settings
    this.injector.logger.info(`[graphql-ws] GraphQL Subscriptions enabled for instance '${instance ?? 'default'}'`)
  }
}
