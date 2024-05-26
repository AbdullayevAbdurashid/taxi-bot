const mongoose = require("mongoose");

const routes = ["Fergana - Tashkent", "route2", "route3"];

const orderSchema = new mongoose.Schema({
  tg_id: {
    type: Number,
    ref: "Users",
    required: true,
  },
  routes: {
    type: String,
    // enum: routes,
    required: true,
  },
  offeredMoney: {
    type: Number,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["parsel", "ride"],
    required: true,
  },
  rideDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Orders", orderSchema);