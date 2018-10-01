const { ApolloServer } = require('apollo-server')
const { MongoClient } = require('mongodb')

const typeDefs = `
    type Photo {
        id: ID!
        name: String!
        description: String
        category: PhotoCategory!
    }

    enum PhotoCategory {
        PORTRAIT
        LANDSCAPE
        ACTION
        SELFIE
    }

    input PostPhotoInput {
        name: String!
        description: String
        category: PhotoCategory=PORTRAIT
    }

    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
    }

    type Mutation {
        postPhoto(input: PostPhotoInput!): Photo!
    }
`

const resolvers = {
    Query: {
        totalPhotos: (parent, args, { photos }) => photos.countDocuments(),
        allPhotos: (parent, args, { photos }) => photos.find().toArray()
    },
    Mutation: {
        postPhoto: async (parent, { input }, { photos }) => {

            const newPhoto = { ...input }

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