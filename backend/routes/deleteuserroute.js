const express = require("express");
const router = express.Router();
const deleteUser = require("../controllers/DeleteUser");
const { verifySuperAdmin } = require("../middleware/superadminauth");

router.delete("/deleteuser/:id",  verifySuperAdmin, deleteUser);

module.exports = router;
