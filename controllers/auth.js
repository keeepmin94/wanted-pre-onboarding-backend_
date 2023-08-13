const User = require("../models/user");
const bcrypt = require("bcrypt");
const { sign } = require("../middlewares/jwt");

//회원가입
exports.join = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });

    if (exUser) {
      return res.status(404).json({ errors: "User's already exist." });
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

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });

    if (!exUser) {
      return res.status(403).json({ errors: "User's doesn't exist." });
    }

    const isEqualPw = await bcrypt.compare(password, exUser.password);

    if (!isEqualPw) {
      return res.status(403).json({ errors: "Password doesn't match." });
    }

    const accessToken = sign(exUser);

    return res.json({
      code: 200,
      message: "토큰이 발급되었습니다.",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
