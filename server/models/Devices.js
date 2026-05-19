const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  usage: {
    type: Number,
    required: true,
  },

  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model(
  "Device",
  deviceSchema
);
