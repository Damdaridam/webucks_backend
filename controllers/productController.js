const productService = require("../services/productService");

const getProductList = async (req, res, next) => {
  try {
    console.log("controller here!!");
    const productList = await productService.getProductList();
    console.log(productList);
    return res.status(201).json({ productList: productList });
  } catch (err) {
    console.log(err);
    // next(err);
  }
};

const getCategoryList = async (req, res, next) => {
  try {
    console.log("GET category controller here!!");
    const categoryList = await productService.getCategoryList();
    console.log(categoryList);
    return res.status(201).json({ categoryList: categoryList });
  } catch (err) {
    console.log(err);
  }
};

const getDetailList = async (req, res, next) => {
  try {
    console.log("GET detail controller here!!");
    const detailList = await productService.getDetailList();
    return res.status(201).json({ productDetailList: detailList });
  } catch (err) {
    console.log(err);
  }
};



module.exports = {
  getProductList,
  getCategoryList,
  getDetailList,
};
