//requiring express
const express = require("express");
//requiring connection
const connection = require("../serverAndConnection/connection");
//requiring json web token
const jwt = require("jsonwebtoken");
//starting route
const router = express.Router();
const authentication = require("../middleware/authentication");
//environment variable configuration
require("dotenv").config();

// REST API for user registration
router.post("/register", async (req, res) => {
  try {
    // user data provided by user for registration
    let user = req.body;
    // query for adding new user record in database
    let query =
      "insert into users (displayName,userName,emailId,mobileNumber,password) values (?,?,?,?,?)";
    // putting values in query
    await connection.query(
      query,
      [
        user.displayName,
        user.userName,
        user.emailId,
        user.mobileNumber,
        user.password,
      ],
      (err, result) => {
        if (!err) {
          // returning successful response
          console.log(result);
          return res
            .status(200)
            .json({ message: "User registered successfully" });
        }
        // returning error response if occured while posting data in database
        return res.status(400).json(err.message);
      }
    );
  } catch (error) {
    // returning error response if occured inside try block
    return res.status(400).json({ message: "something went wrong" });
  }
});

// REST API for user login
router.post("/login", async (req, res) => {
  try {
    let user = req.body;
    // query for finding user in database
    let query =
      "select * from users where userName = ? or emailId = ? or mobileNumber = ?";
    await connection.query(
      query,
      [user.userName, user.emailId, user.mobileNumber],
      (err, result) => {
        if (
          !err &&
          result.length != 0 &&
          user.password === result[0].password
        ) {
          // UserID as payload
          let userId = result[0].userId;
          // genrating token with 5 minutes validity
          const jwtToken = jwt.sign({ userId }, process.env.secret, {
            expiresIn: "300s",
          });
          // returning successful response with token
          return res.status(200).json({
            token: jwtToken,
            message: "userID is " + userId + " required to add power usage.",
          });
        } else if (!err) {
          // returning error response if password is wrong
          return res.status(403).json({ message: "invalid password" });
        }
        // returning error response if error found while checking identity
        return res.status(403).json({ message: "invalid credentials" });
      }
    );
  } catch (error) {
    // returning error response if occured inside try block
    return res.status(400).json({ message: "something went wrong" });
  }
});

module.exports = router;
