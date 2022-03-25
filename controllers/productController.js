const productService = require("../services/productService");

const getProductList = async (req, res) => {
  //특정 카테고리에 따라서 나오도록 변경
  try {
    const categoryId = req.url.split("/")[2];
    const productList = await productService.getProductList(categoryId);
    return res.status(201).json({ productList: productList });
  } catch (err) {
    console.log(err);
  }
};

const getCategoryList = async (req, res) => {
  try {
    console.log(req.headers);
    console.log(req.headers.token);

    const categoryList = await productService.getCategoryList();
    return res.status(201).json({ categoryList: categoryList });
  } catch (err) {
    console.log(err);
  }
};

const getDetailList = async (req, res) => {
  //누른 product id를 통해 해당 제품 정보만 가져옴
  try {
    const id = req.url.split("/")[1];
    const detailList = await productService.getDetailList(id);
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
