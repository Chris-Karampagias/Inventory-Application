const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const indexRouter = require("./routes/index");
const shopRouter = require("./routes/shop");

const app = express();

//compress all routes
app.use(compression());

//add helmet to middleware chain
app.use(helmet());

//set up rate limiter: max of 10 requests pre minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
});
app.use(limiter);

//mongodb connection setup
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function main() {
  await mongoose.connect(process.env.MONGODB_URI); //production env variable
}

try {
  main();
} catch (err) {
  console.log(err);
}

// view engine setup
app.engine("ejs", require("express-ejs-extend"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, "/public/stylesheets")));

app.use("/", indexRouter);
app.use("/shop", shopRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
