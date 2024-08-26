const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AdminSignInController");

router.post("/",authController.handleAdminLogin);

module.exports = router;
