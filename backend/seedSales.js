const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Sales = require("./models/sales");

dotenv.config();

const dummySales = [
  // Jan 2026
  { productName: "SmartWinnr Learn", revenue: 20000, quantity: 1, month: 1, year: 2026 },
  { productName: "SmartWinnr Quiz", revenue: 14000, quantity: 1, month: 1, year: 2026 },
  { productName: "SmartWinnr Coach", revenue: 14000, quantity: 1, month: 1, year: 2026 },

  // Feb 2026
  { productName: "SmartWinnr Learn", revenue: 30000, quantity: 1, month: 2, year: 2026 },
  { productName: "SmartWinnr Quiz", revenue: 22000, quantity: 1, month: 2, year: 2026 },
  { productName: "SmartWinnr Coach", revenue: 18000, quantity: 1, month: 2, year: 2026 },

  // Mar 2026
  { productName: "SmartWinnr Learn", revenue: 35000, quantity: 1, month: 3, year: 2026 },
  { productName: "SmartWinnr Quiz", revenue: 28000, quantity: 1, month: 3, year: 2026 },
  { productName: "SmartWinnr Coach", revenue: 21000, quantity: 1, month: 3, year: 2026 },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB...");

    // Clear existing
    await Sales.deleteMany({});
    console.log("Cleared existing sales records.");

    // Insert dummy data
    await Sales.insertMany(dummySales);
    console.log("Dummy sales data inserted successfully.");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedDB();
