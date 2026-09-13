require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("./src/models/Course");
const LiveClass = require("./src/models/LiveClass");

const courses = [
  { title: "Morning Awakening", description: "Gentle stretches to wake your body and mind.", level: "Beginner", category: "Energy", access: "FREE", durationMinutes: 20, totalClasses: 12, rating: 4.9 },
  { title: "Stress Release", description: "Slow movement and breathing for a calmer evening.", level: "Beginner", category: "Stress relief", access: "FREE", durationMinutes: 25, totalClasses: 16, rating: 4.8 },
  { title: "Core & Balance", description: "Build stability, mobility and controlled strength.", level: "Intermediate", category: "Strength", access: "PREMIUM", durationMinutes: 30, totalClasses: 18, rating: 4.9 },
  { title: "7-Day Beginner Flow", description: "A gentle introduction to daily yoga.", level: "Beginner", category: "Beginner", access: "FREE", durationMinutes: 20, totalClasses: 7 },
  { title: "21-Day Flexibility", description: "Progressive routines for mobility and range of motion.", level: "Beginner", category: "Flexibility", access: "PREMIUM", durationMinutes: 30, totalClasses: 21 },
  { title: "Mindful Meditation", description: "Breathing and meditation sessions for everyday calm.", level: "Beginner", category: "Stress relief", access: "PREMIUM", durationMinutes: 20, totalClasses: 14 },
  { title: "Evening Unwind", description: "Release tension and slow down before sleep.", level: "Beginner", category: "Stress relief", access: "FREE", durationMinutes: 15, totalClasses: 10 },
  { title: "Strength with Yoga", description: "Controlled flows for full-body strength.", level: "Intermediate", category: "Strength", access: "PREMIUM", durationMinutes: 30, totalClasses: 20 }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Course.deleteMany({});
  await Course.insertMany(courses);

  await LiveClass.deleteMany({});
  await LiveClass.insertMany([
    {
      title: "Weekend Sunrise Flow",
      description: "Wake up slowly with breath-led movement.",
      startsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      durationMinutes: 45,
      instructor: "Arogyam Instructor",
      capacity: 50
    },
    {
      title: "Deep Relaxation",
      description: "Gentle stretches, breathwork and guided rest.",
      startsAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      durationMinutes: 45,
      instructor: "Arogyam Instructor",
      capacity: 50
    }
  ]);

  console.log("Arogyam sample data inserted.");
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});