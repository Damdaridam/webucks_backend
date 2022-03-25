const userService = require("../services/userService"); // module은 {} 안치고 불러옴 {}는 패키지

const checkPasswordPresence= async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("KEY_ERROR");
      err.status = 400;
      throw err;
    }
    const user = await userService.checkBusinessPolicy(email, password);
    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (err) {
    console.log("에러가 컨트롤러까지 왔나", err);
    return res.status(err.status || 500).json({ message: err.message });
  }
};

const logincheckPasswordPresence = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("KEY_ERROR");
      err.status = 400;
      throw err;
    }

    const logintoken = await userService.logincheckBusinessPolicy(
      email,
      password
    );
    console.log("logintoken in controller : ", logintoken);
    return res
      .status(201)
      .json({ message: "LOGIN_SUCCESS!", token: logintoken });
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).json({ message: err.message });
  }
};

const getTotalUserdata = async (req, res, next) => {
  try {
    const userData = await userService.getTotalUserdata();
    return res.status(201).json({ userData: userData });
  } catch (err) {
    console.log(err);
  }
};

const updateUserPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const updatePW = await userService.updateUserPassword(email, password);
    return res.status(201).json({ message: "UPDATED!" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  checkPasswordPresence,
  logincheckPasswordPresence,
  getTotalUserdata,
  updateUserPassword,
};
