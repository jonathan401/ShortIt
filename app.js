const express = require("express");
const morgan = require("morgan");

const urlRouter = require("./routes/urlRoutes");
const shortenerRouter = require("./routes/shorternRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// MIDDLEWARE TO ADD DATA FROM REQUEST TO RESPONSE OBJECT
app.use(express.json());

app.use("/api/v1/shorten", shortenerRouter);
app.use("/api/v1/urls", urlRouter);

module.exports = app;
// https://gist.github.com/greatertomi/a3ae20d4747b7775f008071aa6587e90
