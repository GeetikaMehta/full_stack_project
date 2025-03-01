CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cate_name VARCHAR(255) NOT NULL,
    cate_desc TEXT,
    is_enable VARCHAR(255),
    created_on VARCHAR(255),
    created_by INT
);

CREATE TABLE sub_category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sub_id INT,
    sub_cate_name VARCHAR(255) NOT NULL,
    sub_cate_desc TEXT,
    sub_is_enable VARCHAR(255),
    sub_created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sub_created_by INT,
    FOREIGN KEY (sub_id) REFERENCES category(id) ON DELETE CASCADE
);

CREATE TABLE car_brands (
    brand_id INT PRIMARY KEY AUTO_INCREMENT,
    brand_name VARCHAR(255) NOT NULL UNIQUE,
    country VARCHAR(100),
    logo VARCHAR(255)
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    brand_id INT,
    brand_name VARCHAR(255) NOT NULL,
    model_name VARCHAR(255) NOT NULL,
    year YEAR NOT NULL,
    engine VARCHAR(100),
    fuel_type ENUM('Petrol', 'Diesel', 'Electric', 'Hybrid') NOT NULL,
    transmission ENUM('Manual', 'Automatic', 'CVT', 'AMT') NOT NULL,
    mileage DECIMAL(5,2),
    seating_capacity INT CHECK(seating_capacity BETWEEN 2 AND 8),
    price DECIMAL(10,2) NOT NULL,
    discount INT DEFAULT 0,
    quantity INT NOT NULL,
    logo VARCHAR(255),
    image_url VARCHAR(255),
    product_desc TEXT,
    product_created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    product_created_by INT,
    FOREIGN KEY (brand_id) REFERENCES car_brands(brand_id) ON DELETE CASCADE
);

CREATE TABLE employees (
    employ_id INT PRIMARY KEY AUTO_INCREMENT,
    employ_name VARCHAR(255) NOT NULL,
    employ_phone VARCHAR(15) NOT NULL
);

CREATE TABLE role (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(225) NOT NULL,
    employees_id INT,
    FOREIGN KEY (employees_id) REFERENCES employees(employ_id) ON DELETE CASCADE
);

CREATE TABLE location (
    location_id INT PRIMARY KEY AUTO_INCREMENT,
    location_name VARCHAR(255) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    pin_code VARCHAR(10) NOT NULL,
    delivery VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    users_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    order_status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivery_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(users_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    user_id INT NOT NULL,
    payment_method ENUM('Credit Card', 'Debit Card', 'PayPal', 'UPI', 'Net Banking', 'Cash on Delivery') NOT NULL,
    payment_status ENUM('Pending', 'Completed', 'Failed', 'Refunded') DEFAULT 'Pending',
    transaction_id VARCHAR(255) UNIQUE,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount_paid DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(users_id) ON DELETE CASCADE
);

CREATE TABLE wishlist (
    wishlist_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(users_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

show tables;

select * from category;
select * from sub_category;
select * from products;
select * from employees;
select * from location;
select * from orders;
select * from users;
select * from wishlist;
select * from car_brands;
select * from role;
select * from users;

SELECT * FROM products WHERE id = 2;







