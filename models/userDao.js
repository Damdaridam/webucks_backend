const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserIdByEmail = async (email) => {
  return await prisma.$queryRaw`
    SELECT EXISTS (select * from users where email = ${email} ) as success;
`;
};

const createUser = async (email, secretPassWord) => {
  return await prisma.$queryRaw` 
    INSERT INTO users (email, password) VALUES (${email}, ${secretPassWord});
`;
};

module.exports = { getUserIdByEmail, createUser };
