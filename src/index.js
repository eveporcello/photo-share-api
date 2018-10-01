const { ApolloServer } = require('apollo-server')
const { MongoClient } = require('mongodb')

const typeDefs = `
    type Photo {
        id: ID!
        name: String!
        description: String
    }

    type Query {
        totalPhotos: Int!
    }

    type Mutation {
        postPhoto(name: String! description: String): Photo!
    }
`

const resolvers = {
    Query: {
        totalPhotos: (parent, args, { photos }) => photos.countDocuments()
    },
    Mutation: {
        postPhoto: async (parent, args, { photos }) => {

            const newPhoto = { ...args }

            const { insertedId } = await photos.insertOne(newPhoto)
            newPhoto.id = insertedId.toString()

            return newPhoto

        }
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

