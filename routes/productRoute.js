const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/category/:categoryId", productController.getProductList);
router.get("/categories", productController.getCategoryList);
router.get("/:id", productController.getDetailList);

module.exports = router;
