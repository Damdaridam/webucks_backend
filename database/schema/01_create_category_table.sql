-- 01_create_category_table.sql ('--'는 주석을 나타냅니다.)

-- create category table
CREATE TABLE categories
(
 id INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(100) NOT NULL,
 PRIMARY KEY(id),
 CREATED_AT DATETIME DEFAULT Now()
);
