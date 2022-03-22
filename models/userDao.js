const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserIdByEmail = async (email) => {
  console.log("Dao function getuserid ");
  return await prisma.$queryRaw`
    SELECT EXISTS (select * from users where email = ${email} ) as success;
`;
};

const createUser = async (email, secretPassWord) => {
  return await prisma.$queryRaw` 
    INSERT INTO users (email, password) VALUES (${email}, ${secretPassWord});
`;
};

const compareUserPassword = async (email) => {
  console.log("Dao function comparepassword!");
  return await prisma.$queryRaw`
  SELECT id, password FROM users WHERE email = ${email}
 `;
};

const getTotalUserdata = async () => {
  const users = await prisma.$queryRaw`
  SELECT * FROM users;
  `;
  return users;
};

const updateUserPassword = async (email, secretPassWord) => {
  const updateUser = await prisma.$queryRaw`
    UPDATE users SET password = ${secretPassWord} WHERE email = ${email};    
    `;
  return updateUser;
};

module.exports = {
  getUserIdByEmail,
  createUser,
  compareUserPassword,
  getTotalUserdata,
  updateUserPassword,
};
