const express =  require("express")
const router =  express.Router()
const addSales = require("../controllers/addSales")
const { verifyTokenAndAdmin } = require("../middleware/authMiddleware");
router.post("/addsales", verifyTokenAndAdmin, addSales)
module.exports = router