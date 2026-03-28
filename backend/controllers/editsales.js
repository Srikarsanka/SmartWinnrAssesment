const sales = require("../models/sales");

const editSales = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, revenue, quantity, month, year } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    if (!productName || !revenue || !quantity || !month || !year) {
      return res.status(400).json({ message: "Please enter all required fields" });
    }

    const updatedSales = await sales.findByIdAndUpdate(
      id,{$set:{productName,revenue,quantity,month,year}}, { new: true }
    );

    if (!updatedSales) {
      return res.status(404).json({ message: "Sales not found" });
    }

    return res.status(200).json({
      message: "Sales updated successfully",
      data: updatedSales,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = editSales;