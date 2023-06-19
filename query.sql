-- Create database in ElephantSQL
DATABASE name balbgpvd

-- Create table 

CREATE TABLE category(
    id INT PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    image VARCHAR(255) NOT NULL
);

INSERT INTO category(id, name, image) 
VALUES (1, 'Outfit', 'catimg1.jpg'),
(2, 'Shoes', 'catimg2.jpg');

CREATE TABLE product(
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    stock INT NOT NULL,
    price INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    rate INT NOT NULL,
    brand VARCHAR(255) NOT NULL,
    id_category INT, 
    FOREIGN KEY(id_category) REFERENCES category(id)
);

INSERT INTO product(id, name, stock, price, image, rate, brand, id_category) 
VALUES (1, 'Corporate White Shirt', 20, 110000, 'img1.jpg', 4, 'Alisan', 1),
(2, 'Polo Shirt', 39, 90000, 'img2.jpg', 5, 'Ralph Lauren', 1),
(3, 'Varsity Jacket', 17, 150000, 'img3.jpg', 4, 'Erigo', 1),
(4, 'Nike Dunk Low', 8, 550000, 'img4.jpg', 4, 'Nike', 2),
(5, 'Yeezy slide', 43, 330000, 'img5.jpg', 5, 'Adidas', 2);

CREATE TABLE users(
    id INT PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    phone_number INT NOT NULL,
    gender VARCHAR (255) NOT NULL,
    birth_date DATE NOT NULL,
    image VARCHAR(255) NOT NULL
);

INSERT INTO users(id, name, email, phone_number, gender, birth_date, image) 
VALUES (1, 'Yusuf Setiawan', 'yusuf@gmail.com', 0895345123, 'Male', '2000-08-11', 'prfimg1.jpg'),
(2, 'Sasha Aprilia', 'Aprilias@gmail.com', 0895349373, 'Female', '2003-10-29', 'prfimg2.jpg');

CREATE TABLE transaction(
    id INT PRIMARY KEY,
    payment_method VARCHAR (255) NOT NULL,
    price INT NOT NULL,
    id_user INT NOT NULL,
    id_product INT NOT NULL,
    transaction_date DATE NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id),
    FOREIGN KEY(id_product) REFERENCES product(id)
);

INSERT INTO transaction(id, payment_method, price, id_user, id_product, transaction_date) 
VALUES (1, 'Mastercard', 150000, 1, 3, '20023-06-19'),
(2, 'Gopay', 330000, 2, 5, '20023-06-20');

SELECT transaction.*, users.name AS buyer_name, users.phone_number, product.name, product.brand FROM transaction INNER JOIN users ON transaction.id_user = users.id INNER JOIN product ON transaction.id_product = product.id;