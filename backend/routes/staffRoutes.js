const express = require("express");
const router = express.Router();
const staffController = require("./../controllers/staffController");

router.get("/", staffController.getAllStaff);
router.post("/new", staffController.createStaff);
router.put("/:id", staffController.updateStaff);
router.delete("/:id", staffController.deleteStaff);
router.post("/verify", staffController.createOrUpdateStaff);

module.exports = router;
