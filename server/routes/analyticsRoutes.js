const express = require("express");

const router = express.Router();

const Analytics =
  require("../models/Analytics");

router.post(
  "/",
  async (req, res) => {

    const analytics =
      new Analytics(req.body);

    await analytics.save();

    res.json(analytics);

  }
);

router.get(
  "/",
  async (req, res) => {

    const history =
      await Analytics.find();

    res.json(history);

  }
);

module.exports = router;