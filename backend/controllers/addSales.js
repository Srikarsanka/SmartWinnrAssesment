const sales = require("../models/sales");

const addSales = async (req, res) => {
  try {
    const { productName, revenue, quantity, month, year } = req.body;

    if (!productName || !revenue || !quantity || !month || !year) {
      return res.status(400).json({ message: "Please enter all required fields" });
    }

    const newSales = {
      productName,
      revenue,
      quantity,
      month,
      year,
    };

    await sales.create(newSales);

    return res.status(200).json({ message: "Sales added successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = addSales;