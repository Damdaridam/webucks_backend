const productService = require("../services/productService");
const jwt = require("jsonwebtoken");

const getProductList = async (req, res) => {
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
    console.log("YOURtoken :", req.headers.token); // 토큰이 있는지 없는지 확인
    //토큰이 헤더에 없을 때 (로그인을 안한 고객이라면) 로그인 해라!
    if (!req.headers.token) {
      const err = new Error("LOGIN_REQIRED");
      err.status = 401;
      throw err;
    }
    // 토큰 검증을 해서 토큰 속에 심은 값을 반환받음
    const token = req.headers.token;
    const { userID } = jwt.verify(token, process.env.SECRET_KEY);
    console.log("userID:", userID);

    const categoryList = await productService.getCategoryList();
    return res.status(201).json({
      messege: `환영합니다 ${userID}번 고객님`,
      categoryList: categoryList,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).json({ message: err.message });
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
