const http = require("http");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const routes = require("./routes"); // index.js가 있는 친구는 패키지처럼 되기 떄문에 폴더 전체를 불러도 됨

const app = express();
app.use(express.json());
app.use(routes); //route에 의존성을 가짐
app.get("/", (req, res) => {
  //서버가 켜져 있는지 확인
  res.json({ message: "/endpoint" });
});
//////////////////////////////////////

//로그인하기
// app.post("/users/login", async (req, res) => {
//   try {
//     // const { email, password } = req.body;

//     // if (!email || !password) {
//     //   const err = new Error("KEY_ERROR");
//     //   err.status = 400;
//     //   throw err;
//     // }
//     const duplicateUser = await prisma.$queryRaw`
//     SELECT EXISTS (select * from users where email = ${email} ) as success;
//     `;

//     if (duplicateUser[0].success == 0) {
//       // return res.status(400).json({ message: "NOT_A_USER" });
//       const err = new Error("INVALID_USER (NOT_A_USER)");
//       err.status = 400;
//       throw err;
//     }

//     const compareUserPassword = await prisma.$queryRaw`
//     SELECT id, password FROM users WHERE email = ${email}
//    `;
//     const encryptedPw = bcrypt.compareSync(
//       password,
//       compareUserPassword[0].password
//     );

//     if (!encryptedPw) {
//       //(!encryptedPw)
//       const err = new Error("INVALID_USER (PASSWORD IS WRONG)");
//       err.status = 400;
//       throw err;
//     }

//     if (encryptedPw) {
//       //(encryptedPw)
//       const token = jwt.sign(compareUserPassword[0].id, "tokenhere"); //(compareUserPassword[0].id, "tokenhere")
//       return res.status(200).json({ message: "LOGIN_SUCCESS", jwt: token }); //성공! 알려주고 JWT 토큰 만들어서주기
//     }
//   } catch (err) {
//     return res.status(err.status || 500).json({ message: err.message });
//   }
// });

const server = http.createServer(app);

const start = async () => {
  // 서버를 시작하는 함수입니다.
  try {
    server.listen(7000, () => console.log(`Server is listening on 7000`));
  } catch (err) {
    console.error(err);
    //    await prisma.$disconnect() // 에러가 발생했을 시에 database 연결을 종료합니다.
  }
};

// server.listen(7000, () => {
//   console.log("server is listening on PORT 7000");
// });

start();
