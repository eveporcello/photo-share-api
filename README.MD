PhotoShare API
===============
PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

Contents
---------------

* [Helper Library](src/lib.js) - A library of helper functions
* [Sample Data - Photos](data/photos.json) - Sample JSON data for Photos
* [Sample Data - Users](data/users.json) - Sample JSON data for Users
* [Data Population Functions](data/) - Functions to populate database data
* [Test Upload Page](assets/photos/index.html) - A page to test uploading files

Iterations
---------------

### a. Start

1. [x] Initial Project Folder
2. [ ] Apollo Server 2.0

### b. The Photo Type

1. [ ] Counting the Photos 
2. [ ] Connecting a Database
3. [ ] Setting Up Context
4. [ ] Posting a Photo 
5. [ ] Handling Photo Categories 
6. [ ] Using an Input Type 
7. [ ] Listing All Photos 
8. [ ] Querying a Single Photo 

### c. The User Type

1. [ ] Challenge: Adding the User Type
2. [ ] Connecting Photos to Users
3. [ ] Connecting Users to Photos
4. [ ] Adding currentUser to context

### d. GitHub Auth

1. [ ] Configure an express server
2. [ ] Configure Github OAuth
3. [ ] Add `githubLogin` mutation
4. [ ] Add fake users to `githubLogin` mutation
5. [ ] Identify the `currentUser`

### e. Subscriptions and Custom Scalars

1. [ ] Adding Subscription Support 
2. [ ] Uploading File with postPhoto 
3. [ ] Adding custom scalar for `DateTime`
