const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  photo_url:{
    type: String,
  },
  tg_id: {
    type: Number,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Users", userSchema);
