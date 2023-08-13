const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = {
  sign: (user) => {
    // access token 발급
    const payload = {
      // access token에 들어갈 payload
      id: user.id,
      email: user.email,
    };

    return jwt.sign(payload, secret, {
      // secret으로 sign하여 발급하고 return
      algorithm: "HS256", // 암호화 알고리즘
      expiresIn: "1h", // 유효기간
    });
  },
  verify: (token) => {
    // access token 검증
    let decoded = null;
    try {
      decoded = jwt.verify(token, secret);
      return {
        ok: true,
        id: decoded.id,
        email: decoded.email,
      };
    } catch (err) {
      return {
        ok: false,
        message: err.message,
      };
    }
  },
};
