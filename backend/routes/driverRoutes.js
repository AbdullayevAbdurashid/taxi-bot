const express = require("express");
const router = express.Router();
const driverController = require("./../controllers/driverController");

router.post("/verify", driverController.verifyDriver);
router.get("/", driverController.getAllDrivers);
router.post("/new", driverController.createDriver);
router.put("/update/:id", driverController.updateDriver);

module.exports = router;
