const User = require("../models/user");
const bcrypt = require("bcrypt");

//회원가입
exports.join = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });

    if (exUser) {
      return res.status(404).json({ errors: "user's already exist." });
    }

    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      password: hash,
    });
    return res.status(201).end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
