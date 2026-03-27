const express = require("express")
const getAllUsers = require("../controllers/AllUser")
const getRecentUsers = require("../controllers/RecentUsers")
const Router = express.Router()

Router.get("/allusers", getAllUsers)
Router.get("/recent", getRecentUsers) // latest 5 users for dashboard widget

module.exports = Router