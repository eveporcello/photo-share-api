const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { ApolloServer } = require('apollo-server-express')
const { MongoClient } = require('mongodb')
const { readFileSync } = require('fs')

const typeDefs = readFileSync('src/typeDefs.graphql', 'UTF-8')
const resolvers = require('./resolvers')


console.log('client id: ', process.env.GITHUB_CLIENT_ID)
console.log('client secret: ', process.env.GITHUB_CLIENT_SECRET)

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
        let url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user`
        res.end(`
            <h1>Welcome to the Photo Share API</h1>
            <a href="${url}">Request a GitHub Code</a>
        `)
    })

    app.listen({ port }, () => {
        console.log(`PhotoShare API running on ${port}`)
    })

}

start(process.env.PORT || 4000)