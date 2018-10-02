PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

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

### Add Subscription Resolvers

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

### Publish Events

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
