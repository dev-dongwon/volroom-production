const mongoose = require("mongoose");

const LoginLogSchema = mongoose.Schema({
  os: {
    type: String,
    required: true
  },
  browser: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("LoginLog", LoginLogSchema);
