const express = require("express");

const router = express.Router();

const Device = require("../models/Devices");

// GET DEVICES
router.get("/", async (req, res) => {
  try {
    const devices = await Device.find();

    res.json(devices);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ADD DEVICE
router.post("/", async (req, res) => {
  try {
    const newDevice = new Device({
      name: req.body.name,
      usage: req.body.usage,
      active: true,
    });

    const savedDevice =
      await newDevice.save();

    res.status(201).json(savedDevice);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE DEVICE
router.delete("/:id", async (req, res) => {
  try {
    await Device.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Device Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
