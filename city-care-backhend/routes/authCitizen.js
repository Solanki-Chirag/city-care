const express = require("express");
const router = express.Router();
const authController = require("../Controllers/CitizenSignInController");

router.post("/",authController.handleCitizenLogin);

module.exports = router;
