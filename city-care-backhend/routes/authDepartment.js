const express = require("express");
const router = express.Router();
const authController = require("../Controllers/DepartmentSignInController");

router.post("/", authController.handleDepartmentLogin);

module.exports = router;
