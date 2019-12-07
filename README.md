# Code Test Brickbase

This repository contains code written in NodeJS with errors, bug and incorrect code practice. Your tasks are to:

## Task 1
1. Create Unit and Integration Tests up to for at least 70% test coverage
2. Find and remove all the bugs and error
3. Improve the code quality accordingly
4. Create a SOLUTIONS.md file listing all the correction you made and why you took the decisions your took. This is to help us ascertain your problem solving skills

## Task 2
1. Create a new API for User
2. Create a Models for a User
3. For each event created, connect that event with a user such that every event has a user
4. Create a way to retrieve all events for a user
5. Make it possible to return all a user and all the events created by that user


## Submission
Create a private repo on github, add @michelmustapha and @rajesh-brickbase as collaborators  and send an email to michel@brickbase.io indicating that you are done with the test.

##bugs and fixes
I binded the designed schema to a model by wrapping the schema in a model function imported from mongoose. so a collection of the model can be created on connection.

I imported a connect function from mongoose and made a URI connection to a remote mongodb database.

I corrected the wrong import name of the controllers in the Event.js route file.

In the index.js file, i declare a variable app by instantiating express.

In the event.js page, in the route folder, i exported the router object to make is useable in the index.js file.

corrected the Event.see({}) in the getAllEvents() controller to Event.find().

fixes the Event.make() function to Event.Create().

Created a user schema and created a user field on the Event collection to hold the logged in user's id.
