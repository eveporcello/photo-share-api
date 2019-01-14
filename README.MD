PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

So far, our server handles queries and mutations. Both of these are sent over HTTP. There may be a point where you want to utilize real-time data transport and you might want to incorporate subscriptions. Subscriptions work over websockets meaning that updates are pushed from the server to the page in realtime.

Changes
---------------
### Add Subscriptions to the Schema

```graphql
type Subscription {
    newUser: User!
    newPhoto: Photo!
}
```

### Add Subscription support to the playground

__index.js__
```javascript
app.get('/playground', expressPlayground({ 
    endpoint: '/graphql',
    subscriptionEndpoint: '/graphql' 
}))
```

### Create httpServer to support websocket

__index.js__
```javascript
const { createServer } = require('http')
```

* [ ] remove `app.listen({ port }, () => { ... })`

__index.js__
* We create a new httpServer using the Express app instance
* This is ready to handle all of the http requests sent to it based on our current express configuration
* server.installSubscriptionHandlers is what makes the websockets work. Apollo server adds handlers to support subscriptions with web sockets

```javascript
const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)
httpServer.listen({ port }, () => {
    console.log(`photo-share api running on port ${port}`)
})
```

### Add PubSub 

__index.js__
```javascript
const { ApolloServer, PubSub } = require('apollo-server-express')
```

__index.js__

* We need to adjust the context function
* queries and mutations are sent over http.
* When we send either of these operations to a GraphQL Server, the request argument `req` is sent to the context handler.
* But... when it's a subscription, there's no HTTP request, so there's no request argument. It's null
* In this case, the WebSocket connection argument will be sent to the context function instead.
* so we can get the token from the connection context

```javascript
const client = await MongoClient.connect(process.env.DB_HOST, { useNewUrlParser: true })
const db = client.db()
const pubsub = new PubSub()

const context = async ({ req, connection }) => {
    ...
    const githubToken = req ? req.headers.authorization : connection.context.Authorization
    const currentUser = await users.findOne({ githubToken })
    return { photos, users, currentUser, pubsub }
}
```

### Publish Events
* think of this like node's event emitter. we're publishing events every time we add a new photo to the database or a new user.
* The details about the new photo are passed as the 2nd argumentof the .publish method. 
* This passes details about the new photo or user to every handler that has subscribed to these events.

__resolvers.js__
```javascript
 Mutation: {
    postPhoto: async (parent, { input }, { photos, currentUser, pubsub }) => {

        ...
    
        pubsub.publish('photo-added', { newPhoto })

        return newPhoto

    },
    githubAuth: async (parent, { code }, { users, pubsub }) => {

        ...

        pubsub.publish('user-added', { newUser: user })

        return { user, token: user.githubToken }
        
    }
},
```

### Add Subscription Resolvers

* subscribe to the events
* Any time an event is raised, it will be passed through to the photo subscription.
__resolvers.js__
```javascript
Subscription: {
    newPhoto: {
        subscribe: (parent, data, { pubsub }) => pubsub.asyncIterator('photo-added')
    },
    newUser: {
        subscribe: (parent, data, { pubsub }) => pubsub.asyncIterator('user-added')
    }
}
```

### Test

```graphql
subscription {
  newUser {
    name
  }
}
```

```graphql
mutation auth {
  githubAuth(code: "TEST") {
    token
    user {
      name
    }
  }
}
```

Iterations
---------------

### a. Start

1. [x] Initial Project Folder
2. [x] Apollo Server 2.0

### b. The Photo Type

1. [x] Counting the Photos 
2. [x] Connecting to a database
3. [x] Setting up context
4. [x] Posting Photo
5. [x] Handling Photo Categories 
6. [x] Using an Input Type 
7. [x] Listing All Photos 
8. [x] Querying a Single Photo 

### c. The User Type

1. [x] Challenge: Adding the User Type
2. [x] Connecting Photos to Users
3. [x] Connecting Users to Photos
4. [x] Adding currentUser to context

### d. GitHub Authorization

1. [x] Configure an express server
2. [x] Configure Github OAuth
3. [x] Add `githubLogin` mutation
4. [x] Add fake users to `githubLogin` mutation
5. [x] Identify the `currentUser`

### e. Subscriptions and Custom Scalars

1. [x] Adding Subscription Support 
2. [ ] Uploading File with postPhoto 
3. [ ] Adding custom scalar for `DateTime`
