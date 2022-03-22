-- create allergie table
CREATE TABLE product_images
(
 id INT NOT NULL AUTO_INCREMENT,
 img_url VARCHAR(3000) NOT NULL,
 product_id INT NOT NULL,
 PRIMARY KEY(id),
 FOREIGN KEY (product_id) REFERENCES products (id),
 CREATED_AT DATETIME DEFAULT Now()
);