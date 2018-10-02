const faker = require('faker')
const { MongoClient } = require('mongodb')

require('dotenv').config()

const addUser = async () => {
    const client = await MongoClient.connect(process.env.DB_HOST, { useNewUrlParser: true })
    const db = client.db()

    var user = {
        githubLogin: faker.internet.userName(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`
    }

    await db.collection('users').insertOne(user)

    var photo = {
        id: faker.random.uuid(),
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        userID: user.githubLogin
    }

    await db.collection('photos').insertOne(photo)

    await process.exit()

}

addUser()