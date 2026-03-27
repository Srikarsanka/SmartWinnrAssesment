const express = require("express");
const router = express.Router();
const editUser = require("../controllers/EditUser");
const { verifyTokenAndAdmin } = require("../middleware/authMiddleware");

router.put("/edituser/:id", verifyTokenAndAdmin, editUser);

module.exports = router;
