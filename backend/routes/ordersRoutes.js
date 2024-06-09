const express = require("express");
const router = express.Router();
const staffController = require("./../controllers/ordersController");

router.get("/", staffController.getAllOrders);
router.post("/new", staffController.createOrder);
router.delete("/delete/:id", staffController.deleteOrder);

module.exports = router;
