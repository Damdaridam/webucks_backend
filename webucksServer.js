const http = require("http");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const routes = require("./routes"); // index.js가 있는 친구는 패키지처럼 되기 떄문에 폴더 전체를 불러도 됨

const app = express();

app.use(express.json()); // req.body를 json 형태로 바꿔주는 middleware
app.use(routes); //route에 의존성을 가짐
app.get("/", (req, res) => {//서버가 켜져 있는지 확인
  res.json({ message: "/endpoint" });
});

const server = http.createServer(app);
const start = async () => {
  // 서버를 시작하는 함수입니다.
  try {
    server.listen(process.env.PORT, () =>
      console.log(`Server is listening on 7000`)
    );
  } catch (err) {
    console.error(err);
    //    await prisma.$disconnect() // 에러가 발생했을 시에 database 연결을 종료합니다.
  }
};
// server.listen(7000, () => {
//   console.log("server is listening on PORT 7000");
// });
start();
