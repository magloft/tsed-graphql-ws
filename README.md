<p style="text-align: center" align="center">
 <a href="https://tsed.io" target="_blank"><img src="https://tsed.io/tsed-og.png" width="200" alt="Ts.ED logo"/></a>
</p>

<div align="center">
   <h1>GraphQL WS</h1>
</div>

`@magloft/tsed-graphql-ws` allows you to enable GraphQL Subscription support in your project.

This package uses [`graphql-ws`](https://github.com/enisdenjo/graphql-ws) to bridge a Websocket server with the existing TS.Ed http server. Once set up, you can start using [`type-graphql` Subscriptions](https://typegraphql.com/docs/subscriptions.html).

## Installation

First, make sure you install [@tsed/typegraphql](https://github.com/tsedio/tsed/blob/production/packages/graphql/typegraphql/readme.md#installation).

Next, install the GraphQL WS module:

```bash
npm install --save @magloft/tsed-graphql-ws
# or
yarn add @magloft/tsed-graphql-ws
```

Import `@magloft/tsed-graphql-ws` in your Server, and configure your instance:

```typescript
import { Configuration } from '@tsed/common'
import '@magloft/tsed-graphql-ws'

@Configuration({
  graphqlws: {
    instance: 'default'
  }
})
export class Server {}
```

> This instance needs to match your `graphql` instance ID

## Usage

Once installed, websocket server & subscription support will bootstrap automatically when you start your server. The following log message should indicate that you're good to go:

```prolog
[INFO ] [TSED] - [graphql-ws] GraphQL Subscriptions enabled for instance 'default'
```

## License

The MIT License (MIT)

Copyright (c) 2016 - 2018 Romain Lenzotti

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
