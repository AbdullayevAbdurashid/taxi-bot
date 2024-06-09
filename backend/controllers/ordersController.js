const express = require("express");
const router = express.Router();
const Orders = require("../models/orders");

// Function to get all orders
const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Orders.find({}).populate({
      path: 'tg_id',
      model: 'Users',
      match: { tg_id: '$tg_id' },
      foreignField: 'tg_id',
      localField: 'tg_id',
    });
    res.send(allOrders);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};
// Function to create a new order
const createOrder = async (req, res) => {
  console.log(req.body);
  try {
    const newOrder = new Orders(req.body);
    const savedOrder = await newOrder.save();
  
    // const allOrders = await Orders.find({}).populate({ path: "tg_id" });
    // io.emit("allOrders", allOrders);

    res.send(savedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error: " + err.message);
  }
};

// Function to delete an order
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Orders.deleteOne({ _id: req.params.id });
    res.send(deletedOrder);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};

// Assign the functions to router paths
module.exports = {
  getAllOrders,
  createOrder,
  deleteOrder,
  
};

