const users = require("../models/users");
const Sales = require("../models/sales");

const getAnalytics = async (req, res) => {
  try {
    // real user counts from the database
    const total = await users.countDocuments();
    const admins = await users.countDocuments({ role: "Admin" });
    const superAdmins = await users.countDocuments({ role: "Super Admin" });
    const viewers = await users.countDocuments({ role: "Viewer" });
    
    // active/inactive sums for the dashboard
    const active = await users.countDocuments({ isActive: { $ne: false } });
    const inactive = await users.countDocuments({ isActive: false });

    const currentYear = new Date().getFullYear();

    // Aggregate sales data for the current year directly in MongoDB
    const salesData = await Sales.aggregate([
      {
        $match: { year: currentYear }
      },
      {
        $group: {
          _id: {
            month: "$month",
            productName: "$productName"
          },
          totalRevenue: { $sum: "$revenue" }
        }
      }
    ]);

    

    return res.status(200).json({
      userStats: { total, admins, superAdmins, viewers, active, inactive },
      salesData
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAnalytics;
