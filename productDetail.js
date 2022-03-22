const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const productDetail = async (req, res) => {
    // JSON_ARRAYAGG(i.image_url),
    // JSON_ARRAYAGG(al.name)
  try {
    const producDetailData = await prisma.$queryRaw`
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
    return res.status(201).json({ producDetailData });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { productDetail };
