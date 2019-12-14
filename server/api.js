const express = require("express"),
  api = express.Router(),

  eventRoutes = require('../routes/events'),
  userRoutes  = require('../routes/users'),
  Auth = require('../routes/auth');

  api.use('/event', eventRoutes);
  api.use('/user', userRoutes);
  api.use('/login', Auth);


  module.exports = api;
  