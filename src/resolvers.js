const { ObjectID } = require('mongodb')
const { authorizeWithGithub, generateFakeUsers } = require('./lib')

module.exports = {
    Query: {
        me: (parent, args, { currentUser }) => currentUser,
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

        },
        githubAuth: async (parent, { code }, { users }) => {

            let payload

            if (code === 'TEST') {
                const { results: [fakeUser] } = await generateFakeUsers(1)
                payload = {
                    login: fakeUser.login.username,
                    name: `${fakeUser.name.first} ${fakeUser.name.last}`,
                    avatar_url: fakeUser.picture.thumbnail,
                    access_token: fakeUser.login.sha1
                }
            } else {
                payload = await authorizeWithGithub({
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code
                })
            }

            if (payload.message) {
                throw new Error(payload.message)
            }

            const githubUserInfo = {
                githubLogin: payload.login,
                name: payload.name,
                avatar: payload.avatar_url,
                githubToken: payload.access_token
            }

            const { ops: [user] } = await users.replaceOne(
                { githubLogin: payload.login },
                githubUserInfo,
                { upsert: true }
            )

            return { user, token: user.githubToken }

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