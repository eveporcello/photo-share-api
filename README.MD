PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------

### Add DateTime to the schema

```graphql
scalar DateTime

type Photo {
    id: ID!
    name: String!
    url: String!
    description: String
    category: PhotoCategory!
    postedBy: User!
    created: DateTime!
}
```


### Modify the Resolver

__resolvers.js__
```javascript
const { GraphQLScalarType } = require('graphql')

__resolvers.js__
...
module.exports = {
    
    ...
    
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A valid date time value.',
        parseValue: value => new Date(value),
        serialize: value => new Date(value).toISOString(),
        parseLiteral: ast => ast.value
    })

}
```
* parseValue: invoked to parse client input that was sent as variables. This is a javascript object
* parseLiteral: invoked to parse input sent inline - AST
* serialize: invoked to take the data and convert it into a format that can be stored.


### Add a date field to the postPhoto 

```javascript
const newPhoto = {
    ...input,
    userID: currentUser.githubLogin,
    created: new Date()
}

```


### Test the Upload (no playground)

* [ ] Drop the photos collection
* [ ] Delete the photos from the assets folder
* [ ] navigate to [http://localhost:4000/img/photos](http://localhost:4000/img/photos)

```graphql
query {
  allPhotos {
    id
    url
    created
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
4. [x] Adding currentUser to contextA

### d. GitHub Authorization

1. [x] Configure an express server
2. [x] Configure Github OAuth
3. [x] Add `githubLogin` mutation
4. [x] Add fake users to `githubLogin` mutation
5. [x] Identify the `currentUser`

### e. Subscriptions and Custom Scalars

1. [x] Adding Subscription Support 
2. [x] Uploading File with postPhoto 
3. [x] Adding custom scalar for `DateTime`
