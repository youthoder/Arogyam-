const express = require("express");
const Course = require("../models/Course");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.access) filter.access = req.query.access.toUpperCase();
    if (req.query.level) filter.level = req.query.level;

    const courses = await Course.find(filter).sort({ createdAt: -1 });
    res.json({ courses });
  } catch {
    res.status(500).json({ message: "Could not load courses" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json({ course });
  } catch {
    res.status(400).json({ message: "Invalid course ID" });
  }
});

// Example protected endpoint: use this later when premium ownership/payment is added.
router.get("/:id/access", auth, async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });

  if (course.access === "FREE") {
    return res.json({ allowed: true, reason: "free" });
  }

  // Payment/subscription logic should be checked here.
  res.json({ allowed: false, reason: "premium_subscription_required" });
});

module.exports = router;