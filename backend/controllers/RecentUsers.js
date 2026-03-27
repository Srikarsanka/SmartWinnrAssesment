const users = require("../models/users");

const getRecentUsers = async (req, res) => {
  try {
    // get the 5 most recently added users
    const recentUsers = await users
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email role isActive createdAt");

    // also count active and inactive users for the dashboard cards
    const activeCount = await users.countDocuments({ isActive: { $ne: false } });
    const inactiveCount = await users.countDocuments({ isActive: false });

    return res.status(200).json({ recentUsers, activeCount, inactiveCount });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getRecentUsers;
