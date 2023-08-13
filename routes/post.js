const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const { validationResult } = require("express-validator");
const {
  signupValidator,
  validatorErrorChecker,
} = require("../middlewares/validators,js");
const { verifyToken } = require("../middlewares/jwt");
const { uploadPost } = require("../controllers/post");

// POST /auth/join
router.post("/create", verifyToken, uploadPost);

module.exports = router;
