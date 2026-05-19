const mongoose = require("mongoose");

const settingsSchema =
  new mongoose.Schema({

    darkMode: Boolean,

    notifications: Boolean,

    aiMode: Boolean,

  });

module.exports =
  mongoose.model(
    "Settings",
    settingsSchema
  );