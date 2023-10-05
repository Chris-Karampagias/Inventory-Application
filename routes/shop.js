const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categorycontroller");
const clotheController = require("../controllers/clothecontroller");

//View categories (home page)
router.get("/", categoryController.category_list);

// View men's & women's clothing
router.get("/mens_clothing", clotheController.mens_clothing_list);
router.get("/womens_clothing", clotheController.womens_clothing_list);

//Add clothing
router.get("/create", clotheController.clothing_create_get);
router.post("/create", clotheController.clothing_create_post);

//View men's clothe detail
router.get("/mens_clothing/:id", clotheController.clothing_detail);

//Update men's clothing
router.get("/mens_clothing/:id/update", clotheController.clothing_update_get);
router.post("/mens_clothing/:id/update", clotheController.clothing_update_post);

//Delete men's clothing
router.get("/mens_clothing/:id/delete", clotheController.clothing_delete_get);
router.post("/mens_clothing/:id/delete", clotheController.clothing_delete_post);

//View women's clothe detail
router.get("/womens_clothing/:id", clotheController.clothing_detail);

//Add women's clothing
router.get("/womens_clothing/create", clotheController.clothing_create_get);
router.post("/womens_clothing/create", clotheController.clothing_create_post);

//Update women's clothing
router.get("/womens_clothing/:id/update", clotheController.clothing_update_get);
router.post(
  "/womens_clothing/:id/update",
  clotheController.clothing_update_post
);

//Delete women's clothing
router.get("/womens_clothing/:id/delete", clotheController.clothing_delete_get);
router.post(
  "womens_clothing/:id/delete",
  clotheController.clothing_delete_post
);

module.exports = router;
