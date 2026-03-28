const express = require("express")
const router = express.Router()
const authenticateUser = require("../middleware/auth")
const getSales = require("../controllers/getSales")

// this route fetches all the sales records — visible to Admin and Super Admin
router.get("/allsales", authenticateUser, getSales)

module.exports = router
