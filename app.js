const express = require("express");

const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const authRouter = require("./routes/auth");

const { sequelize } = require("./models");

const app = express();

app.set("port", process.env.PORT || 3000);
// app.set("view engine", "ejs");
// app.engine("html", require("ejs").renderFile);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json()); //bodyParser json
app.use(express.urlencoded({ extended: false })); //bodyParser form

app.use("/auth", authRouter);

app.use((req, res, next) => {
  //404 전용(없는 라우터)
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

//에러처리 미들웨어(4개의 매개변수)
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {}; //베포모드|개발모드 일때 에러 출력(보안) /(베포 모드시 에러 전용 로그 기록)
  res.status(err.status || 500);
  //res.render("error");
});

module.exports = app;
