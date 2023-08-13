const Post = require("../models/post");

exports.uploadPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: res.locals.decoded.id,
    });

    return res.status(201).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
