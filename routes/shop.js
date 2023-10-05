const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categorycontroller");

//View categories (home page)
router.get("/", categoryController.category_list);

// View men's & women's clothing
router.get("/mens_clothing", clotheController.mens_clothing_list);
router.get("/womens_clothing", clotheController.womens_clothing_list);

//Add men's clothing
router.get("/mens_clothing/create", clotheController.mens_clothing_create_get);
router.post(
  "/mens_clothing/create",
  clotheController.mens_clothing_create_post
);

//Update men's clothing
router.get(
  "/mens_clothing/:id/update",
  clotheController.mens_clothing_update_get
);
router.post(
  "/mens_clothing/:id/update",
  clotheController.mens_clothing_update_post
);

//Delete men's clothing
router.get(
  "/mens_clothing/:id/delete",
  clotheController.mens_clothing_delete_get
);
router.post(
  "/mens_clothing/:id/delete",
  clotheController.mens_clothing_delete_post
);

//Add women's clothing
router.get(
  "/womens_clothing/create",
  clotheController.womens_clothing_create_get
);
router.post(
  "/womens_clothing/create",
  clotheController.womens_clothing_create_post
);

//Update women's clothing
router.get(
  "/womens_clothing/:id/update",
  clotheController.womens_clothing_update_get
);
router.post(
  "/womens_clothing/:id/update",
  clotheController.womens_clothing_update_post
);

//Delete women's clothing
router.get(
  "/womens_clothing/:id/delete",
  clotheController.womens_clothing_delete_get
);
router.post(
  "womens_clothing/:id/delete",
  clotheController.womens_clothing_delete_post
);

module.exports = router;
