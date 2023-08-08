const express = require("express");

const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3000);

module.exports = app;
