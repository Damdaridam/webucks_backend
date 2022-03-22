const userService = require("../services/userService"); // module은 {} 안치고 불러옴 {}는 패키지

const checkPasswordLength = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("KEY_ERROR");
      err.status = 400;
      throw err;
    }
    const user = userService.checkBusinessPolicy(email, password);
    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { checkPasswordLength };
