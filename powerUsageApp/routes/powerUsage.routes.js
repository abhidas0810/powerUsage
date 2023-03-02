// requiring express
const express = require("express");
// requiring connection
const connection = require("../serverAndConnection/connection");
// starting route
const router = express.Router();
// for cheking authentication
const authentication = require("../middleware/authentication");

// for cheking applicance type it must be 3 types (low-power, high-power, mid-power)
const checkApplianceType = (applianceType) => {
  if (
    applianceType === "low-power" ||
    applianceType === "mid-power" ||
    applianceType === "high-power" ||
    applianceType === "LOW-POWER" ||
    applianceType === "MID-POWER" ||
    applianceType === "HIGH-POWER"
  ) {
    return true;
  } else {
    return false;
  }
};

// REST API for adding power usage
router.post("/addPowerUsage", authentication, async (req, res) => {
  try {
    // power Usage data provided by user
    let powerUsage = req.body;
    if (!checkApplianceType(powerUsage.applianceType)) {
      return res.status(400).json({ message: "wrong applianceType" });
    }
    // query for adding new power usage record in database
    let query =
      "insert into powerUsage (fromTime,toTime,duration,unitsConsumed,applianceType,userId) values (?,?,?,?,?,?)";
    // putting values in query
    await connection.query(
      query,
      [
        powerUsage.fromTime,
        powerUsage.toTime,
        powerUsage.duration,
        powerUsage.unitsConsumed,
        powerUsage.applianceType,
        powerUsage.userId,
      ],
      (err, result) => {
        if (!err) {
          // returning successful response
          return res
            .status(200)
            .json({ message: "power usage added successfully" });
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

module.exports = router;
