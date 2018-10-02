const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { ApolloServer, PubSub } = require('apollo-server-express')
const { MongoClient } = require('mongodb')
const { readFileSync } = require('fs')
const { createServer } = require('http')

const typeDefs = readFileSync('src/typeDefs.graphql', 'UTF-8')
const resolvers = require('./resolvers')

const start = async (port) => {

    const client = await MongoClient.connect(process.env.DB_HOST, { useNewUrlParser: true })
    const db = client.db()
    const pubsub = new PubSub()

    const context = async ({ req, connection }) => {
        const photos = db.collection('photos')
        const users = db.collection('users')
        const githubToken = req ? req.headers.authorization : connection.context.Authorization
        const currentUser = await users.findOne({ githubToken })
        return { photos, users, currentUser, pubsub }
    }

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context
    })

    const app = express()
    server.applyMiddleware({ app })

    app.get('/playground', expressPlayground({
        endpoint: '/graphql',
        subscriptionEndpoint: '/graphql'
    }))

    app.get('/', (req, res) => {
        let url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user`
        res.end(`
            <h1>Welcome to the Photo Share API</h1>
            <a href="${url}">Request a GitHub Code</a>
        `)
    })

    const httpServer = createServer(app)
    server.installSubscriptionHandlers(httpServer)
    httpServer.listen({ port }, () => {
        console.log(`PhotoShare API running on port ${port}`)
    })

}

start(process.env.PORT || 4000)