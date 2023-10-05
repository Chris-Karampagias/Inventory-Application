const Clothes = require("../models/clothes");
const asyncHandler = require("express-async-handler");

exports.mens_clothing_list = asyncHandler(async (req, res, next) => {
  const mensClothes = await Clothes.find(
    { type: "men" },
    "name price type"
  ).orFail(new Error("Could not find requested resource"));
  res.render("clothes_list", { clothes: mensClothes });
});

exports.womens_clothing_list = asyncHandler(async (req, res, next) => {
  const womensClothes = await Clothes.find(
    { type: "women" },
    "name price type"
  ).orFail(new Error("Could not find requested resource"));
  res.render("clothes_list", { clothes: womensClothes });
});

exports.clothing_detail = asyncHandler(async (req, res, next) => {
  const clothe = await Clothes.findById(req.params.id).orFail(
    new Error("Could not find requested resource")
  );
  res.render("clothe_detail", { clothe: clothe });
});

exports.clothing_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: create get");
});

exports.clothing_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED:  create post");
});

exports.clothing_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: update get");
});

exports.clothing_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: update post");
});

exports.clothing_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: delete get");
});

exports.clothing_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED:  delete post");
});
