const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");

const checkBusinessPolicy = async (email, password) => {
  try {
    if (password.length < 8) {
      const err = new Error("PASSWORD_TOO_SHORT");
      err.status = 400;
      throw err;
    }

    const user = await userDao.getUserIdByEmail(email);

    if (user[0].success == 1) {
      const err = new Error("EXSITING_USER");
      err.status = 409;
      throw err;
    }

    const secretPassWord = bcrypt.hashSync(password, bcrypt.genSaltSync());
    const newUser = await userDao.createUser(email, secretPassWord);
    return newUser;
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const logincheckBusinessPolicy = async (email, password, next) => {
  try {
    if (password.length < 8) {
      console.log("password short!!");
      const err = new Error("PASSWORD_TOO_SHORT");
      err.status = 400;
      throw err;
    }

    const user = await userDao.getUserIdByEmail(email);

    if (user[0].success == 0) {
      console.log("not a user!");
      const err = new Error(" NOT_A_USER");
      err.status = 400;
      throw err;
    }

    const compareUserPassword = await userDao.compareUserPassword(email);
    console.log(compareUserPassword, compareUserPassword[0].password);
    const encryptedPw = bcrypt.compareSync(
      password,
      compareUserPassword[0].password
    );
    console.log("encryptedPW : ", encryptedPw);
    if (!encryptedPw) {
      const err = new Error("PASSWORD IS WRONG");
      err.status = 400;
      throw err;
    }

    const token = jwt.sign(compareUserPassword[0].id, "tokenhere"); //(compareUserPassword[0].id, "tokenhere")
    console.log(token);
    return token;
    // return res.status(200).json({ message: "LOGIN_SUCCESS", jwt: token }); //성공! 알려주고 JWT 토큰 만들어서주기
  } catch (err) {
    console.log(err);
    next(err);
    // return res.status(err.status || 500).json({ message: err.message });
  }
};

const getTotalUserdata = async () => {
  try{
    const data = await userDao.getTotalUserdata();
    return await data;
  }catch(err) {
    console.log(err)
   }
  }

const updateUserPassword = async(email, password) => {
  try{
    const secretPassWord = bcrypt.hashSync(password, bcrypt.genSaltSync());
    const update = await userDao.updateUserPassword(email, secretPassWord)
  }catch(err) {
    console.log(err)
  }
}


module.exports = { checkBusinessPolicy, logincheckBusinessPolicy, getTotalUserdata, updateUserPassword };
