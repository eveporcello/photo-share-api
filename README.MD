PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------

### Modularize the Files
* Move typeDefs to Own File
* Import typeDefs

```javascript
const { readFileSync } = require('fs')
const typeDefs = readFileSync('src/typeDefs.graphql', 'UTF-8')
```

* Move resolvers to resolvers.js file (make sure to import `const { ObjectID } = require('mongodb')`)

```javascript
const resolvers = require('./resolvers')
```

### Set up Express Server

* Install dependencies

```
npm i express 
npm i apollo-server-express 
npm i graphql-playground-middleware-express
```
* Change index.js

```javascript
const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { ApolloServer } = require('apollo-server-express')

...

const start = async (port) => {

    ...
    
    const server = new ApolloServer({ typeDefs, resolvers, context })
    
    const app = express()
    server.applyMiddleware({app})

    app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

    app.get('/', (req, res) => {
        res.end(`Welcome to the Photo Share API`)
    })

    app.listen({ port }, () => {
        console.log(`photo-share api running on port ${port}`)
    })

}

start(process.env.PORT || 4000)
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
2. [ ] Configure Github OAuth
3. [ ] Add `githubLogin` mutation
4. [ ] Add fake users to `githubLogin` mutation
5. [ ] Identify the `currentUser`
6. [ ] Post New Photos

### e. Subscriptions and Custom Scalars

1. [ ] Adding Subscription Support 
2. [ ] Uploading File with postPhoto 
3. [ ] Adding custom scalar for `DateTime`
