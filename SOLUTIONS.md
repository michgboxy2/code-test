##bugs and fixes
I binded the designed schema to a model by wrapping the schema in a model function imported from mongoose. so a collection of the model can be created on connection.

I imported a connect function from mongoose and made a URI connection to a remote mongodb database.

I corrected the wrong import name of the controllers in the Event.js route file.

In the index.js file, i declare a variable app by instantiating express.

In the event.js page, in the route folder, i exported the router object to make is useable in the index.js file.

corrected the Event.see({}) in the getAllEvents() controller to Event.find() because the Event.see({}) function does not exist in mongoose.

fixes the Event.make() function to Event.Create() because only both model.save() and model.create() are the correct creation API for mongoose.

Created a user schema and created a user field on the Event collection to hold the logged in user's id.

i created an api.js file so application concerns can be separated. The api.js file only exports all router routes.

i edited the event url to take a "/event" route because of consistency with other routes and to avoid route naming collision

