// seedData.js
const mongoose = require("mongoose");

const { CourseCategory } = require("../models/index"); // Import your Mongoose model

async function seedData() {
  const string = process.env.MONGODB_URI || "";

  await mongoose.connect(string);

  try {
    // Define the data you want to seed
    const dataToSeed = [
      { category: "Technology" },
      { category: "Computer Science" },
      { category: "Engineering" },
      { category: "Business" },
      { category: "Practicals" },
    ];

    // Insert the data into the database
    await CourseCategory.insertMany(dataToSeed);

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
  }
}

seedData();
