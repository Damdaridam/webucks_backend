const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProductList = async () => {
  console.log("productDao here!");
  const product = await prisma.$queryRaw`
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
  console.log("product in Dao :", product);
  return await product;
};

const getCategoryList = async () => {
  const category = await prisma.$queryRaw`
  SELECT id, name FROM categories ORDER BY id;
`;
  return category;
};

const getDetailList = async () => {
  const detail = await prisma.$queryRaw`
  SELECT 
  p.id,
  p.korean_name, 
  p.english_name,
  n.caffein, n.fat, n.sugar, n.sodium,
  i.image_url, 
  al.name

  FROM product_images AS i
  LEFT JOIN products AS p
  ON p.id = i.product_id

  LEFT JOIN nutritions AS n
  ON p.id = n.product_id

  LEFT JOIN products_allergies AS pa
  ON p.id = pa.product_id

  LEFT JOIN allergies AS al
  ON pa.allergy_id = al.id
  `;
  return detail;
};



module.exports = { getProductList, getCategoryList, getDetailList};
