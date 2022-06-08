import { GraphQLWSSettings } from './GraphQLWSSettings'

declare global {
  namespace TsED {
    interface Configuration {
      graphqlws: GraphQLWSSettings
    }
  }
}

export * from './GraphQLWSSettings'
