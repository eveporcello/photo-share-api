const { ApolloServer } = require('apollo-server')
const { MongoClient } = require('mongodb')

const typeDefs = `
    type Query {
        totalPhotos: Int!
    }
`

const resolvers = {
    Query: {
        totalPhotos: (parent, args, { photos }) => photos.countDocuments()
    }
}

const start = async () => {

    const client = await MongoClient.connect(process.env.DB_HOST, { useNewUrlParser: true })
    const db = client.db()

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: {
            photos: db.collection('photos')
        }
    })

    server.listen()
        .then(({ port }) => `server listening on ${port}`)
        .then(console.log)
        .catch(console.error)

}

start()

