const express = require("express");
const router = express.Router();
const loginroute = require("../controllers/login");

router.post("/login", loginroute);

module.exports = router;