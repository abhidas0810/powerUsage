//requiring express
const express = require("express");

//requiring connection
const connection = require("./serverAndConnection/connection");
const app = express();

//to get response in json format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

module.exports = app;
