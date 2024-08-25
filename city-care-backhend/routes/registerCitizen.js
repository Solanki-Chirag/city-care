const express = require("express");
const router = express.Router();
const registerController = require("../Controllers/CitizenSignUpController");

router.post("/", registerController.handleNewCitizen);

module.exports = router;
