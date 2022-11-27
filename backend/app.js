const path = require('path');
const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET"
  );
  next();
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', function (request, response) {
  response.sendFile(path.join(__dirname, '../build/index.html'));
});

module.exports = app;
