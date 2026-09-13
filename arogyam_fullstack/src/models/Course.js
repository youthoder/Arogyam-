const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    level: String,
    category: String,
    access: { type: String, enum: ["FREE", "PREMIUM", "LIVE"], default: "FREE" },
    durationMinutes: Number,
    totalClasses: Number,
    rating: Number,
    thumbnail: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);