const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const { validationResult } = require("express-validator");
const { join, login } = require("../controllers/auth");
const {
  signupValidator,
  validatorErrorChecker,
} = require("../middlewares/validators,js");

// POST /auth/join
router.post("/join", signupValidator, validatorErrorChecker, join);

// POST /auth/login
router.post("/login", signupValidator, validatorErrorChecker, login);

module.exports = router;
