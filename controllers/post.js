const Post = require("../models/post");
const User = require("../models/user");
const counter = 5; //pagination 5개 고정

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

exports.getAllPosts = async (req, res, next) => {
  try {
    // const params = req.params;
    const posts = await Post.findAll({
      attributes: ["id", "content", "createdAt", "updatedAt"],
      include: { model: User, attributes: ["id", "email"] },
      order: [["createdAt", "DESC"]],
      offset: parseInt(req.query.counter) * (parseInt(req.query.page) - 1), //params.counter * params.page
      limit: parseInt(req.query.counter), //params.counter
    });

    res.json({
      code: 200,
      payload: posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const params = req.params;
    const post = await Post.findOne({
      where: { id: params.id },
      attributes: ["id", "content", "createdAt", "updatedAt"],
      include: { model: User, attributes: ["id", "email"] },
    });

    if (!post) {
      return res
        .status(404)
        .json({ errors: `Post [${params.id}]id doesn't exist.` });
    }

    res.json({
      code: 200,
      payload: post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const params = req.params;
    const post = await Post.findOne({
      where: { id: params.id },
    });

    if (!post) {
      return res
        .status(404)
        .json({ errors: `Post [${params.id}]id doesn't exist.` });
    }

    if (post.UserId !== res.locals.decoded.id) {
      return res.status(404).json({ errors: `Doesn't match the author's ID.` });
    }

    await post.update({ content: req.body.content });
    await post.save();

    res.json({
      code: 200,
      payload: post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const params = req.params;
    const post = await Post.findOne({
      where: { id: params.id },
    });

    if (!post) {
      return res
        .status(404)
        .json({ errors: `Post [${params.id}]id doesn't exist.` });
    }

    if (post.UserId !== res.locals.decoded.id) {
      return res.status(404).json({ errors: `Doesn't match the author's ID.` });
    }

    await post.destroy();

    res.json({
      code: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};
