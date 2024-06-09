const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  available: {
    type: Boolean,
    required: false,
  },
  // transportType: {
  //   type: String,
  //   required: true,
  // },
  location: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  passengers: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Drivers", userSchema);
