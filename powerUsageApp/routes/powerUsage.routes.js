// requiring express
const express = require("express");
// requiring connection
const connection = require("../serverAndConnection/connection");
// starting route
const router = express.Router();
// for cheking authentication
const authentication = require("../middleware/authentication");
const lowPower = 1;
const midPower = 2;
const highPower = 3;

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

let calculateDuration = (startTime, endTime) => {
  let start = new Date(startTime);
  let end = new Date(endTime);
  return Math.floor(((end.getTime() - start.getTime()) / 1000 / 60) << 0);
};

let calculateUnitsConsumed = (applianceType, duration) => {
  if (applianceType === "low-power" || applianceType === "LOW-POWER") {
    return duration * lowPower;
  } else if (applianceType === "mid-power" || applianceType === "MID-POWER") {
    return duration * midPower;
  } else {
    return duration * highPower;
  }
};

// REST API for adding power usage
router.post("/addPowerUsage", authentication, async (req, res) => {
  try {
    // power Usage data provided by user
    let powerUsage = req.body;

    // checking appliance type is valid or not
    if (!checkApplianceType(powerUsage.applianceType)) {
      return res.status(400).json({ message: "wrong applianceType" });
    }

    // calculating duration in minutes
    let duration = calculateDuration(powerUsage.fromTi powerUsage.toTime);

    // calculating units Consumed as per usage
    let unitsConsumed = calculateUnitsConsumed(
      powerUsage.applianceType,
      duration
    );

    // query for adding new power usage record in database
    let query =
      "insert into powerUsage (fromTime,toTime,duration,unitsConsumed,applianceType,userId) values (?,?,?,?,?,?)";

    // putting values in query
    await connection.query(
      query,
      [
        powerUsage.fromTime,
        powerUsage.toTime,
        duration,
        unitsConsumed,
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

// REST API for getting list of power usage in given time
router.post("/listPowerUsage", authentication, async (req, res) => {
  try {
    let timings = req.body;
    // query for getting list of power usage in given time
    let query =
      " select * from powerUsage where fromTime >= ? and toTime <= ? and userId = ?;";
    // putting values in query
    await connection.query(
      query,
      [timings.startTime, timings.endTime, timings.userId],
      (err, result) => {
        if (!err) {
          // returning successful response
          return res.status(200).json(result);
        }
        // returning error response if occured while posting data in database
        return res.status(400).json(err.message);
      }
    );
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
});

// REST API for getting list of power usage in given time
router.post("/listPowerUsage", authentication, async (req, res) => {
  try {
    let timings = req.body;
    // query for getting list of power usage in given time
    let query =
      " select * from powerUsage where fromTime >= ? and toTime <= ? and userId = ?;";
    // putting values in query
    await connection.query(
      query,
      [timings.startTime, timings.endTime, timings.userId],
      (err, result) => {
        if (!err) {
          // returning successful response
          return res.status(200).json(result);
        }
        // returning error response if occured while searching data in database
        return res.status(400).json(err.message);
      }
    );
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
});

// REST API for getting list of power usage day wise
router.post("/listPowerUsagePerDate", authentication, async (req, res) => {
  try {
    let timings = req.body;
    // query for getting list of power usage in given time day wise
    let query =
      " select powerUsageId,fromTime,toTime,applianceType,userId,sum(unitsConsumed) as totalUnitsConsumed,sum(duration) as totalDuration from powerUsage where fromTime >= ? and toTime <= ? and userId = ? group by date(fromtime),date(toTime)";
    // putting values in query
    await connection.query(
      query,
      [timings.startTime, timings.endTime, timings.userId],
      (err, result) => {
        if (!err) {
          // returning successful response
          return res.status(200).json(result);
        }
        // returning error response if occured while searching data in database
        return res.status(400).json(err.message);
      }
    );
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
});

module.exports = router;
