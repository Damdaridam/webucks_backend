const userService = require("../services/userService"); // module은 {} 안치고 불러옴 {}는 패키지

//middleware 
const validateForm = async(req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) { //유효선 통과 못했을 때 실행
    res.status(400).json({ message: "KEY_ERROR" });
    return;
  }
  next ();
}

const checkPasswordPresence= async (req, res) => {
  try {
    const { email, password } = req.body;// 하단서비스로 넘겨주기 위해 받아야함
    const user = await userService.checkBusinessPolicy(email, password);
    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

const logincheckPasswordPresence = async (req, res) => {
  try {
    const { email, password } = req.body;
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

const getTotalUserdata = async (req, res) => {
  try {
    const userData = await userService.getTotalUserdata();
    return res.status(201).json({ userData: userData });
  } catch (err) {
    console.log(err);
  }
};

const updateUserPassword = async (req, res) => {
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
  validateForm
};
