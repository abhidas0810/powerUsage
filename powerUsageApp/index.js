//requiring express
const express = require("express");

//requiring connection
const connection = require("./serverAndConnection/connection");

//user routes
const userRoutes = require("./routes/users.routes");

const app = express();

//to get response in json format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(8888);
app.use("/user", userRoutes);
// module.exports = app;
