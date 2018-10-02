const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { ApolloServer } = require('apollo-server-express')
const { MongoClient } = require('mongodb')
const { readFileSync } = require('fs')

const typeDefs = readFileSync('src/typeDefs.graphql', 'UTF-8')
const resolvers = require('./resolvers')

const start = async (port) => {

    const client = await MongoClient.connect(process.env.DB_HOST, { useNewUrlParser: true })
    const db = client.db()

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: {
            photos: db.collection('photos'),
            users: db.collection('users'),
            currentUser: { githubLogin: "Stephan.Kohler15" }
        }
    })

    const app = express()
    server.applyMiddleware({ app })

    app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

    app.get('/', (req, res) => {
        res.end('Welcome to the PhotoShare API')
    })

    app.listen({ port }, () => {
        console.log(`PhotoShare API running on ${port}`)
    })

}

start(process.env.PORT || 4000)