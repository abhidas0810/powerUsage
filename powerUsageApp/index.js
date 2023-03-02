//requiring express
const express = require("express");

//requiring connection
const connection = require("./serverAndConnection/connection");

//user routes
const userRoutes = require("./routes/users.routes");

//power usage routes
const powerUsageRoutes = require("./routes/powerUsage.routes");

const app = express();

//to get response in json format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//using port number for requests
app.listen(8888);

//for accessing user endpoints
app.use("/user", userRoutes);

//for accessing user endpoints
app.use("/powerUsage", powerUsageRoutes);
