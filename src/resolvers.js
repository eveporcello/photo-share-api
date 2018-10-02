const { ObjectID } = require('mongodb')

module.exports = {
    Query: {
        totalPhotos: (parent, args, { photos }) => photos.countDocuments(),
        allPhotos: (parent, args, { photos }) => photos.find().toArray(),
        Photo: (parent, { id }, { photos }) => photos.findOne({ _id: ObjectID(id) }),
        totalUsers: (parent, args, { users }) => users.countDocuments(),
        allUsers: (parent, args, { users }) => users.find().toArray(),
        User: (parent, { githubLogin }, { users }) => users.findOne({ githubLogin })
    },
    Mutation: {
        postPhoto: async (parent, { input }, { photos, currentUser }) => {

            if (!currentUser) {
                throw new Error('only an authorized user can post a photo')
            }

            const newPhoto = {
                ...input,
                userID: currentUser.githubLogin
            }

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