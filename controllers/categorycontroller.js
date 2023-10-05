const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}, "name description").orFail(
    new Error("Could not get requested resource")
  );

  res.render("home_page", { categories: categories });
});
