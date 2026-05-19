const express = require("express");

const router = express.Router();

const Settings =
  require("../models/Settings");

router.post(
  "/",
  async (req, res) => {

    const settings =
      new Settings(req.body);

    await settings.save();

    res.json(settings);

  }
);

module.exports = router;