# UniPower FullStack Assignment

## This is a barebones repo that can quickly serve up a Node server with Express.

### Simply run 'node server.js' to run the server.

There are two files that you can work in (feel free to reorganize or add more files): `config/users.js` and `config/middleware.js`.

`users.js` contains some logic to generate some User objects. There is also a place for you to add any functions you might need when building the API.

`middleware.js` is where you can find the skeleton for building the Users' route.

### Middleware.js --> Defines your app (where to find static files, what middleware to include)

Middleware.js also establishes some generic routing you are more than free to modify to your liking.

## Objectives

Build a few routes for Users.

One queries all Users, and one route that takes a string as the argument, and looks up Users by that name.

Next, have the React App request User data from the Node server, and in the React App, build a UI that will display all users on load (see the React README for more info.)

## What we are looking for

This is meant to mirror some of the tools you will be using at UniPower, so focus on building code utilizing modern JS (ES6+) and show us how you might organize your code.

Feel free to add any packages you would like to use. We are most interested in your solutions and how you handle various challenges in this codebase.

## Optional

- Add pagination to retrieving users
- Make a full RESTful route for users (delete, post, etc.)
- add a Dockerfile to create a Docker image for this repo
