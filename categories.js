const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categories = async (req, res) => {
  try {
    const categoryData = await prisma.$queryRaw`
    SELECT id, name FROM categories ORDER BY id;
  `;
    return res.status(201).json({ categoryData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { categories };
