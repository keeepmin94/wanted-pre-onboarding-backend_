const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const { validationResult } = require("express-validator");
const {
  signupValidator,
  paginationValidator,
  postIdValidator,
  validatorErrorChecker,
} = require("../middlewares/validators,js");
const { verifyToken } = require("../middlewares/jwt");
const {
  uploadPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/post");

// POST /post/create
router.post("/create", verifyToken, uploadPost);

// GET /post/all/:page
router.get(
  "/all",
  verifyToken,
  paginationValidator,
  validatorErrorChecker,
  getAllPosts
); //"/:counter/:page"

// GET /post/:id
router.get(
  "/:id",
  verifyToken,
  postIdValidator,
  validatorErrorChecker,
  getPost
);

// PATCH /post/:id
router.patch(
  "/:id",
  verifyToken,
  postIdValidator,
  validatorErrorChecker,
  updatePost
);

// DELETE /post/:id
router.delete(
  "/:id",
  verifyToken,
  postIdValidator,
  validatorErrorChecker,
  deletePost
);

module.exports = router;
