const productDao = require("../models/productDao");

const getProductList = async () => {
  try {
    const data = await productDao.getProductList();
    return await data;
  } catch (err) {
    console.log(err);
  }
};

const getCategoryList = async() => {
try{
  const data = await productDao.getCategoryList();
  return await data;
}catch(err) {
  console.log(err)
 }
}

const getDetailList = async() => {
  try{
    const data = await productDao.getDetailList();
    return await data;
  }catch(err) {
    console.log(err)
   }
  }



module.exports = { getProductList, getCategoryList, getDetailList };
