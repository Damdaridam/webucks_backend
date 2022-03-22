const http = require("http");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { productList } = require("./productList");
const { categories } = require("./categories");
const { productList } = require("./productList");
const { productDetail } = require("./productDetail");
// const { productDetail } = require("./productDetail");
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  //서버가 켜져 있는지 확인
  res.json({ message: "/endpoint" });
});
//////////////////////////////////////

app.get("/products/categories", categories); //제품 카테고리 API (어느경로로 오면 응답할지, 무엇을 내어줄지)
app.get("/products", productList); //제품 리스트 API
app.get("/products/2", productDetail); //제품 상세 API (현재는 상수로 하지만 나중에 변수로 바꿀꺼임)

//회원가입
app.post("/users/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("KEY_ERROR");
      err.status = 400;
      throw err;
    }
    if (password.length < 8) {
      const err = new Error("PASSWORD_TOO_SHORT");
      err.status = 400;
      throw err;
    }

    const duplicateUser = await prisma.$queryRaw`
    SELECT EXISTS (select * from users where email = ${email} ) as success;
    `;

    if (duplicateUser[0].success == 1) {
      const err = new Error("EXSITING_USER");
      err.status = 409;
      throw err;
    } else {
      //// 정상적인 회원가입 성공!
      const passwordSalt = bcrypt.genSaltSync();
      const secretPassWord = bcrypt.hashSync(password, passwordSalt); //bcrypt.genSaltSync()로 바꾸기
      await prisma.$queryRaw` 
      INSERT INTO users (email, password) VALUES (${email}, ${secretPassWord});
    `;
      return res.status(201).json({ message: "SIGNUP_SUCCESS" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }); // 6
  }
});

//유저테이블 가져오기
app.get("/users", async (req, res) => {
  try {
    const userData = await prisma.$queryRaw`
    SELECT * FROM users;
    `;
    res.status(201).json({ userData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//비밀번호 업데이트하기
app.put("/users", async (req, res) => {
  try {
    const { password, email } = req.body;
    const updateUser = await prisma.$queryRaw`
    UPDATE users SET password = ${password} WHERE email = ${email};    
    `;
    return res.status(201).json({ message: "UPDATED" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//로그인하기
app.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("KEY_ERROR");
      err.status = 400;
      throw err;
    }
    const duplicateUser = await prisma.$queryRaw`
    SELECT EXISTS (select * from users where email = ${email} ) as success;
    `;

    if (duplicateUser[0].success == 0) {
      // return res.status(400).json({ message: "NOT_A_USER" });
      const err = new Error("INVALID_USER (NOT_A_USER)");
      err.status = 400;
      throw err;
    }

    const compareUserPassword = await prisma.$queryRaw`
    SELECT id, password FROM users WHERE email = ${email}
   `;
    const encryptedPw = bcrypt.compareSync(
      password,
      compareUserPassword[0].password
    );

    if (!encryptedPw) {
      //(!encryptedPw)
      const err = new Error("INVALID_USER (PASSWORD IS WRONG)");
      err.status = 400;
      throw err;
    }

    if (encryptedPw) {
      //(encryptedPw)
      const token = jwt.sign(compareUserPassword[0].id, "tokenhere"); //(compareUserPassword[0].id, "tokenhere")
      console.log(compareUserPassword);
      console.log(compareUserPassword[0].id);
      console.log(token);
      return res.status(200).json({ message: "LOGIN_SUCCESS", jwt: token }); //성공! 알려주고 JWT 토큰 만들어서주기
    }
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
});

const server = http.createServer(app);

// server.listen(7000, () => {
//   console.log("server is listening on PORT 7000");
// });

const start = async () => {
  // 서버를 시작하는 함수입니다.
  try {
    server.listen(7000, () => console.log(`Server is listening on 7000`));
  } catch (err) {
    console.error(err);
    //    await prisma.$disconnect() // 에러가 발생했을 시에 database 연결을 종료합니다.
  }
};
start();
