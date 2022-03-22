const bcrypt = require("bcrypt");
const res = require("express/lib/response");
// const jwt = require("jsonwebtoken");
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

module.exports = { checkBusinessPolicy };
