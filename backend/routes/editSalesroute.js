const express =  require("express")
const router =  express.Router()
const { verifyTokenAndAdmin } = require("../middleware/authMiddleware");
const editSales = require("../controllers/editsales")
router.put("/editsales/:id", verifyTokenAndAdmin, editSales)
module.exports = router