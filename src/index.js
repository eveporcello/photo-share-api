const { ApolloServer } = require('apollo-server')

const typeDefs = `
    type Query {
        gnar: String
    }
`

const resolvers = {
    Query: {
        gnar: () => 'gnarly!!!'
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen()
    .then(({ port }) => `server listening on ${port}`)
    .then(console.log)
    .catch(console.error)