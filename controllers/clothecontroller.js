const Clothes = require("../models/clothes");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
  res.render("clothe_form", {
    title: "Create clothe",
    clothe: undefined,
    errors: null,
  });
});

exports.clothing_create_post = [
  body("name", "Name is required").trim().isLength({ min: 1 }).escape(),
  body("description", "Description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Price is required")
    .isFloat({ min: 1 })
    .withMessage("Price must be a (positive) number")
    .escape(),
  body("stock_number")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Price is required")
    .isInt({ min: 0 })
    .withMessage("Price must be a (non negative) integer")
    .escape(),
  body("type", "Type is required").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const clothe = new Clothes({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock_number: req.body.stock_number,
      type: req.body.type,
    });

    if (!errors.isEmpty()) {
      res.render("clothe_form", {
        title: "Create clothe",
        clothe: clothe,
        errors: errors.array(),
      });
    } else {
      await clothe.save();
      res.redirect(clothe.url);
    }
  }),
];

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
