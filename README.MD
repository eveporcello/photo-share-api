PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------
* Add the user to context. Get the name from a db record.

```javascript
currentUser: { githubLogin: "Stephan.Kohler15" }
```
* Adjust the mutation
```javascript
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
        console.log(newPhoto)
        return newPhoto

    }
},
```

* Send the test queries
```graphql
query user($githubLogin: String!) {
  User(githubLogin: $githubLogin) {
    name
    postedPhotos {
      name
      url
    }
  }
}

mutation post($input:PostPhotoInput!) {
  postPhoto(input:$input) {
    id
    url
    postedBy {
      name
    }
  }
}
```

```json
{
  "githubLogin":"<Correct Login>",
  "input": {
    "name": "Sick Turns",
  	"description": "Carving big turns in the deep powder.",
  	"category": "ACTION"
  }
}
```

* Test the Error: Change the currentUser in the index.js

```javascript
context: {
    currentUser: null
}
```


Iterations
---------------

### a. Start

1. [x] Initial Project Folder
2. [x] Apollo Server 2.0

### b. The Photo Type

1. [x] Counting the Photos 
2. [x] Connecting to a database
3. [x] Setting up context
4. [x] Posting Photo
5. [x] Handling Photo Categories 
6. [x] Using an Input Type 
7. [x] Listing All Photos 
8. [x] Querying a Single Photo 

### c. The User Type

1. [x] Challenge: Adding the User Type
2. [x] Connecting Photos to Users
3. [x] Connecting Users to Photos
4. [x] Adding currentUser to context

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
