const express = require("express");
const app = require("express")();
const mongoose = require("mongoose");
const DB_URL = `mongodb://localhost:27017/nc_news`;
const bodyParser = require("body-parser");
const apiRouter = require("./routes/apiRouter");
const topicsRouter = require("./routes/topicsRouter")

mongoose.connect(DB_URL).then(() => {
  console.log(`Connected to the DB on ${DB_URL}...`);
});
app.use(bodyParser.json());





module.exports = app;
