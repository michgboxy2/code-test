const express = require("express"),
  app = express(),
  cors = require("cors"),
  api = require("./api"),
  bps = require("body-parser");

app.use(cors());
app.use(bps.json());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use("/", api);

app.use((err, req, res, next) => {
  // console.log(err);
  return res.status(500).json(err);
  next();
});

module.exports = app;
