const express = require("express");
const auth = require("../middleware/auth");
const Course = require("../models/Course");
const Progress = require("../models/Progress");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const progress = await Progress.find({ user: req.user._id }).populate("course");
  res.json({ progress });
});

router.post("/:courseId", auth, async (req, res) => {
  try {
    const { completedClasses, percentage } = req.body;
    const course = await Course.findById(req.params.courseId);

    if (!course) return res.status(404).json({ message: "Course not found" });

    const progress = await Progress.findOneAndUpdate(
      { user: req.user._id, course: course._id },
      {
        completedClasses: Math.max(0, Number(completedClasses) || 0),
        percentage: Math.min(100, Math.max(0, Number(percentage) || 0)),
        lastWatchedAt: new Date()
      },
      { new: true, upsert: true }
    );

    res.json({ progress });
  } catch {
    res.status(400).json({ message: "Could not update progress" });
  }
});

module.exports = router;