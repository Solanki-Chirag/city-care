const express = require("express");
const router = express.Router();
const authController = require("../Controllers/DepartmentSignInCOntroller");

router.post("/",authController.handleDepartmentLogin);

module.exports = router;
