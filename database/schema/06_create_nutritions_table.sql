CREATE TABLE nutritions
(
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  caffein FLOAT NULL,
  fat FLOAT NULL,
  sugar FLOAT NULL,
  sodium FLOAT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products (id), 
  CREATED_AT DATETIME DEFAULT Now()
);