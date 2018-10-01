PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Changes
---------------

### Add Environment variables

* [ ] Add `.env` file: `DB_HOST=mongodb://localhost:27017/photo-share`
* [ ] Add `.env` to `.gitignore`
* [ ] Install `dotenv`: `npm i dotenv`
* [ ] Modify `start` script in `package.json`.
* [ ] Log the `process.env.DB_HOST` to make sure environment vars are working
* [ ] Start the app: `npm start`

__package.json__
```json
"scripts": {
  "start": "nodemon -r dotenv/config ./src/index.js"
}
```

__index.js__
```javascript

...
console.log('database host: ', process.env.DB_HOST)
...

```
Iterations
---------------

### a. Start

1. [x] Initial Project Folder
2. [ ] Apollo Server 2.0

### b. The Photo Type

1. [ ] Counting the Photos 
2. [ ] Posting a Photo 
3. [ ] Handling Photo Categories 
4. [ ] Using an Input Type 
5. [ ] Listing All Photos 
6. [ ] Querying a Single Photo 

### c. The User Type

1. [ ] Challenge: Adding the User Type
2. [ ] Connecting Photos to Users
3. [ ] Connecting Users to Photos
4. [ ] Adding currentUser to context

### d. Context

1. [ ] Add environment and refactor
2. [ ] Configuring a Database
3. [ ] Configure an express server
4. [ ] Configure Github OAuth
5. [ ] Add `githubLogin` mutation
6. [ ] Add fake users to `githubLogin` mutation
7. [ ] Identify the `currentUser`
8. [ ] Post new Photos to the Database

### e. Subscriptions and Custom Scalars

1. [ ] Adding Subscription Support 
2. [ ] Uploading File with postPhoto 
3. [ ] Adding custom scalar for `DateTime`
