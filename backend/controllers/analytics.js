const users = require("../models/users");

const getAnalytics = async (req, res) => {
  try {
    // real user counts from the database
    const total = await users.countDocuments();
    const admins = await users.countDocuments({ role: "Admin" });
    const superAdmins = await users.countDocuments({ role: "Super Admin" });
    const viewers = await users.countDocuments({ role: "Viewer" });
    
    // new active/inactive sums for the dashboard
    const active = await users.countDocuments({ isActive: { $ne: false } });
    const inactive = await users.countDocuments({ isActive: false });

    // months for the x-axis
    const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

    // dummy revenue data for 3 SmartWinnr products over 6 months
    const products = [
      {
        name: "SmartWinnr Learn",
        revenue: [18000, 22000, 25000, 20000, 30000, 35000],
      },
      {
        name: "SmartWinnr Quiz",
        revenue: [12000, 15000, 18000, 14000, 22000, 28000],
      },
      {
        name: "SmartWinnr Coach",
        revenue: [12000, 18000, 18000, 14000, 18000, 21000],
      },
    ];

    return res.status(200).json({
      userStats: { total, admins, superAdmins, viewers, active, inactive },
      months,
      products,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAnalytics;
