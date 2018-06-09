
const DB_URL = process.env.DB_URL || require("./config").DB_URL;

const express = require("express");
const app = require("express")();
const mongoose = require("mongoose");
// const { DB_URL } = require("./config");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/apiRouter");
mongoose.connect(DB_URL).then(() => {
  console.log(`Connected to the DB on ${DB_URL}...`);
});
app.use(bodyParser.json());

app.use("/api", apiRouter);

app.get("/*", (req, res, next) => {
  next({ status: 404 });
});

app.use((err, req, res, next) => {
  console.log(err)
  if (err.status === 404) res.status(404).send({ message: "404 - Page Not Found" });
  else{ (err.status === 400) 
    res.status(400).send({ message: " 400 - Bad Request" });
  
}
 
})

module.exports = app;
