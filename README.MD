PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------
* Add postedPhotos field to User

```graphql
type User {
    ...
    postedPhotos: [Photo!]!
}
```

* Add postedPhotos resolver

```javascript
postedPhotos: (parent, args, { photos}) => photos.find({ userID: parent.githubLogin }).toArray()
```

* Test with a Query
```graphql
query photos {
  allUsers {
    id
    name
    postedPhotos {
      name
    }
  }
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
