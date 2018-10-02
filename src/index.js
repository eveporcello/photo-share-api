const { ApolloServer } = require('apollo-server')
const { MongoClient, ObjectID } = require('mongodb')

const typeDefs = `
    type Photo {
        id: ID!
        name: String!
        description: String
        category: PhotoCategory!
        url: String
        postedBy: User!
    }

    type User {
        githubLogin: ID!
        name: String!
        postedPhotos: [Photo!]!
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
        Photo(id: ID!): Photo!
        totalUsers: Int!
        allUsers: [User!]!
        User(githubLogin: ID!): User
    }

    type Mutation {
        postPhoto(input: PostPhotoInput!): Photo!
    }
`

const resolvers = {
    Query: {
        totalPhotos: (parent, args, { photos }) => photos.countDocuments(),
        allPhotos: (parent, args, { photos }) => photos.find().toArray(),
        Photo: (parent, { id }, { photos }) => photos.findOne({ _id: ObjectID(id) }),
        totalUsers: (parent, args, { users }) => users.countDocuments(),
        allUsers: (parent, args, { users }) => users.find().toArray(),
        User: (parent, { githubLogin }, { users }) => users.findOne({ githubLogin })
    },
    Mutation: {
        postPhoto: async (parent, { input }, { photos }) => {

            const newPhoto = { ...input }

            const { insertedId } = await photos.insertOne(newPhoto)
            newPhoto.id = insertedId.toString()

            return newPhoto

        }
    },
    Photo: {
        id: parent => parent.id || parent._id.toString(),
        url: parent => `/img/photos/${parent.id || parent._id.toString()}.jpg`,
        postedBy: (parent, args, { users }) => users.findOne({ githubLogin: parent.userID })
    },
    User: {
        postedPhotos: (parent, args, { photos }) => photos.find({ userID: parent.githubLogin }).toArray()
    }
}

const start = async () => {

    const client = await MongoClient.connect(process.env.DB_HOST, { useNewUrlParser: true })
    const db = client.db()

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: {
            photos: db.collection('photos'),
            users: db.collection('users')
        }
    })

    server.listen()
        .then(({ port }) => `server listening on ${port}`)
        .then(console.log)
        .catch(console.error)

}

start()