//requiring json web token
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.send({ response: "no user found" });
  }
  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json(err);
    }
    next();
  });
};

module.exports = authentication;
