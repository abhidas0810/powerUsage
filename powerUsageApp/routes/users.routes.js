const express = require("express");
const connection = require("../serverAndConnection/connection");
const router = express.Router();

router.post("/register", (req, res) => {
  let user = req.body;
  let query =
    "insert into users (displayName,userName,emailId,mobileNumber,password) values (?,?,?,?,?)";
  connection.query(
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
        return res
          .status(200)
          .json({ message: "User registered successfully" });
      }
      return res.status(400).json(err.message);
    }
  );
});

module.exports = router;
