PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------

### Schema Changes

* Modify the User Type
```graphql
type User {
    githubLogin: ID!
    name: String!
    avatar: String!
    postedPhotos: [Photo!]!
}
```

* Add the Mutation

```graphql
type AuthPayload {
    token: String!
    user: User!
}

type Mutation {
    postPhoto(input: PostPhotoInput!): Photo!
    githubAuth(code: String!): AuthPayload!
}
```

* Add the githubLogin Mutation
```javascript
 Mutation: {
        githubAuth: async (parent, { code }, { users }) => {

            const payload = await authorizeWithGithub({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            })

            if (payload.message) {
                throw new Error(payload.message)
            }

            const githubUserInfo = {
                githubLogin: payload.login,
                name: payload.name,
                avatar: payload.avatar_url,
                githubToken: payload.access_token
            }

            const { ops:[user] } = await users.replaceOne(
                { githubLogin: payload.login }, 
                githubUserInfo, 
                { upsert: true }
            )

            return { user, token: user.githubToken }
            
        }
    }
```

* Go to `http://localhost:4000`
* Click Link
* Get Code
* Send Mutation

```graphql
mutation {
  githubAuth(code:"<CODE_HERE>") {
    token
    user {
      name
      githubLogin
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
4. [x] Adding currentUser to context

### d. GitHub Authorization

1. [x] Configure an express server
2. [x] Configure Github OAuth
3. [x] Add `githubLogin` mutation
4. [ ] Add fake users to `githubLogin` mutation
5. [ ] Identify the `currentUser`
6. [ ] Post New Photos

### e. Subscriptions and Custom Scalars

1. [ ] Adding Subscription Support 
2. [ ] Uploading File with postPhoto 
3. [ ] Adding custom scalar for `DateTime`
