const mongoose = require("mongoose");

const analyticsSchema =
  new mongoose.Schema({

    totalUsage: Number,

    monthlyCost: Number,

    savings: Number,

    createdAt: {
      type: Date,
      default: Date.now,
    },

  });

module.exports =
  mongoose.model(
    "Analytics",
    analyticsSchema
  );