const express = require("express");
const auth = require("../middleware/auth");
const LiveClass = require("../models/LiveClass");

const router = express.Router();

router.get("/", async (req, res) => {
  const classes = await LiveClass.find({ startsAt: { $gte: new Date() } })
    .sort({ startsAt: 1 })
    .limit(20);

  res.json({ classes });
});

router.post("/:id/reserve", auth, async (req, res) => {
  try {
    const liveClass = await LiveClass.findById(req.params.id);

    if (!liveClass) {
      return res.status(404).json({ message: "Live class not found" });
    }

    if (liveClass.capacity && liveClass.attendees.length >= liveClass.capacity) {
      return res.status(409).json({ message: "This class is full" });
    }

    const alreadyReserved = liveClass.attendees.some(
      id => id.toString() === req.user._id.toString()
    );

    if (!alreadyReserved) {
      liveClass.attendees.push(req.user._id);
      await liveClass.save();
    }

    res.json({ message: "Seat reserved", liveClass });
  } catch {
    res.status(400).json({ message: "Could not reserve seat" });
  }
});

module.exports = router;