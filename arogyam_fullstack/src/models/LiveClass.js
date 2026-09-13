const mongoose = require("mongoose");

const liveClassSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    startsAt: { type: Date, required: true },
    durationMinutes: { type: Number, default: 45 },
    instructor: String,
    meetingUrl: String,
    capacity: Number,
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("LiveClass", liveClassSchema);