const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const productList = async (req, res) => {
  try {
    const productListData = await prisma.$queryRaw`
      SELECT  
      p.id, p.korean_name, p.english_name, p.category_id,
      c.name,
      pi.image_url
      FROM products as p
      LEFT JOIN categories as c 
      ON p.category_id = c.id
      LEFT JOIN product_images as pi 
      ON p.id = pi.product_id
      ORDER BY p.id
      `;

    return res.status(201).json({ productListData });
  } catch (err) {
    console.log(err);
  }
  return res.status(500).json({ message: err.message });
};

module.exports = { productList };
