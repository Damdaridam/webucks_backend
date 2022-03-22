CREATE TABLE products_allergies
(
 id INT NOT NULL AUTO_INCREMENT,
 product_id INT,
 allergy_id INT, 
 PRIMARY KEY(id),
 FOREIGN KEY (product_id) REFERENCES products (id),
 FOREIGN KEY (allergy_id) REFERENCES allergies (id),
 CREATED_AT DATETIME DEFAULT Now()
);