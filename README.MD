PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------
### Add a file type to the Post Photo Input

* need to modify the API to handle multipart/form-data, the encoding type that is required to pass a file with a post body over the internet. 
* we're going to take an additional step here that will allow us to pass a file as a GraphQL Argument so the file itself can be handled directly within the resolver.
* Apollo Server provides a custom scalar called Upload
* It can be used to capture the file stream, mimetype, and encoding of an uploaded file.

```graphql
input PostPhotoInput {
    name: String! 
    description: String 
    category: PhotoCategory=PORTRAIT
    file: Upload!
}
```

### Modify the Resolver to Accept the file

__resolvers.js__
```javascript
const path = require('path')
const { authorizeWithGithub, generateFakeUsers, uploadFile } = require('./lib')
```

__resolvers.js__
```javascript
postPhoto: async (parent, { input }, { photos, currentUser, pubsub }) => {

    if (!input.file) {
        throw new Error('a photo file is required')
    }

    ...
    
    var toPath = path.join(__dirname, '..', 'assets', 'photos', `${newPhoto.id}.jpg`)
    await uploadFile(input.file, toPath)

    pubsub.publish('photo-added', { newPhoto })

    return newPhoto

},
```

### Serve the assets folder

__index.js__
```javascript
const path = require('path')

...

app.use(
    '/img/photos',
    express.static(path.join(__dirname, '..', 'assets', 'photos'))
)
```

### Test the Upload (no playground)

* [ ] navigate to [http://localhost:4000/img/photos](http://localhost:4000/img/photos)
* [ ] add a users `githubToken` to the first token field
* [ ] Click browser and select an image

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
3. [ ] Adding custom scalar for `DateTime`
