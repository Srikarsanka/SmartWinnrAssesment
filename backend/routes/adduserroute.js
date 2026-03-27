const express = require("express")
const router =  express.Router()
const addUser =  require("../controllers/AddUser.js")
const { verifyTokenAndAdmin } = require("../middleware/authMiddleware");

router.post("/adduser", verifyTokenAndAdmin, addUser)

module.exports = router