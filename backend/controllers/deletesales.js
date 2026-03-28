const sales = require("../models/sales");

const deleteSales = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Sales ID is required" });
    }

    const deletedSales = await sales.findByIdAndDelete(id);

    if (!deletedSales) {
      return res.status(404).json({ message: "Sales not found" });
    }

    return res.status(200).json({
      message: "Sales deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteSales;