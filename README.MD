PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------

* Add postPhoto to Schema

```graphql
type Mutation {
    postPhoto(name: String! description: String): Photo!
}
```

* Add postPhoto to Resolvers

```javascript
Mutation: {
    postPhoto: async (parent, args, { photos }) => {

        const newPhoto = { ...args }

        const { insertedId } = await photos.insertOne(newPhoto)
        newPhoto.id = insertedId.toString()

        return newPhoto

    }
}
```


Iterations
---------------

### a. Start

1. [x] Initial Project Folder
2. [ ] Apollo Server 2.0

### b. The Photo Type

1. [ ] Counting the Photos 
2. [ ] Connecting to a database
3. [ ] Setting up context
4. [ ] Posting Photo
5. [ ] Handling Photo Categories 
6. [ ] Using an Input Type 
7. [ ] Listing All Photos 
8. [ ] Querying a Single Photo 

### c. The User Type

1. [ ] Challenge: Adding the User Type
2. [ ] Connecting Photos to Users
3. [ ] Connecting Users to Photos
4. [ ] Adding currentUser to context

### d. GitHub Authorization

1. [ ] Configure an express server
2. [ ] Configure Github OAuth
3. [ ] Add `githubLogin` mutation
4. [ ] Add fake users to `githubLogin` mutation
5. [ ] Identify the `currentUser`
6. [ ] Post New Photos

### e. Subscriptions and Custom Scalars

1. [ ] Adding Subscription Support 
2. [ ] Uploading File with postPhoto 
3. [ ] Adding custom scalar for `DateTime`
