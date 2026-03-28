const express =  require("express")
const router =  express.Router()
const { verifySuperAdmin } = require("../middleware/superadminauth");
const deleteSales = require("../controllers/deletesales")
router.delete("/deletesales/:id", verifySuperAdmin, deleteSales)
module.exports = router