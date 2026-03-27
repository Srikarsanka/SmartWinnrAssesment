const express = require("express");
const router = express.Router();
const getAnalytics = require("../controllers/analytics");

// no auth needed — just summary stats with dummy sales data
router.get("/summary", getAnalytics);

module.exports = router;

