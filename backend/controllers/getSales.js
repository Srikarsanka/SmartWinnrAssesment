const Sales = require("../models/sales")

// this function gets all the sales from the DB and sends them back
const getSales = async (req, res) => {
  try {
    // find all sales records, show latest ones first
    const allSales = await Sales.find().sort({ createdAt: -1 })

    return res.status(200).json({ allSales })

  } catch (err) {
    return res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = getSales
