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
  verifyToken: (req, res, next) => {
    try {
      console.log(req.headers);
      // jwt의 검증이 끝나면 jwt의 내용물을 decoded에 넣는다
      res.locals.decoded = jwt.verify(
        //req.headers.authorization,
        req.headers.authorization.split("Bearer ")[1], //postman 사용
        process.env.SECRET
      );
      return next();
    } catch (error) {
      //유효 기간 초과
      if (error.name === "TokenExpiredError") {
        return res.status(419).json({
          code: 419,
          message: "토큰이 만료되었습니다.",
        });
      }
      // 토큰이 위조(검증 실패)
      return res.status(401).json({
        code: 401,
        message: "유효하지 않은 토큰입니다.",
      });
    }
  },
};
