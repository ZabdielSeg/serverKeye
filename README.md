# Keyence project

## Introduction
On this project I was asked to create a backend app and a frontend app that is able to receive a excel document and save the data on a DB.
I chose MongoDB using mongoose.

The admin user should be able to:

**1. See the list of users**\
**2. See the details of a user**\
**3. Add new users**\
**4. Update existing users**\
**5. Delete users**

But wait! That's not all!

I also used JWT (a technologie I've never used ir) to authenticate the user and give or deny access.


## Instructions

### Iteration 0 | Initialize the project

After forking and cloning the project, you will have an example of a  `.env` file saved on the `.env.example`

And you have to install all the dependencies:


```sh
$ npm install
```

Now you are ready to start 🚀


## Iteration #1 There are two main lists of routes:

### User Routes:
Here are the routes you will be using:

|   Route   | HTTP Verb |   Description   |
|-----------|-----------|-----------------|
| `/user/all-users` |    GET    | Show all users |
| `/user/create-user` |    POST    | Create a user|
| `/update-user/:userID` |    PUT    | Update a user |
| `/delete-user/:userID` |    DELETE    | Delete a user |



### Auth Routes:
Here are the routes you will be using:

|   Route   | HTTP Verb |   Description   |
|-----------|-----------|-----------------|
| `/logn` |    POST    | Log the user in returning JWT|


# Credendials:
There are currently 2 "admin Users" for the login

**1.-** username: Andrea, pass: AndreaNunez\
**2.-** username: Federica, pass: FedericaShulz


**That's it! 🏆**

Happy reviewing