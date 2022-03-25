const productDao = require("../models/productDao");

const getProductList = async (categoryId) => {
  try {
    const data = await productDao.getProductList(categoryId);
    return await data;
  } catch (err) {
    console.log(err);
  }
};

const getCategoryList = async () => {
  try {
    const data = await productDao.getCategoryList();
    return await data;
  } catch (err) {
    console.log(err);
  }
};

const getDetailList = async (id) => {
  try {
    const data = await productDao.getDetailList(id);
    return await data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getProductList, getCategoryList, getDetailList };
