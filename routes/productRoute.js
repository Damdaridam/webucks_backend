const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getProductList);
router.get("/categories", productController.getCategoryList);
router.get("/2", productController.getDetailList);

module.exports = router;
