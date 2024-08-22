CREATE DATABASE warehouse;

USE warehouse

CREATE TABLE items (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(255) NOT NULL,
descricao TEXT,
preco DECIMAL(10, 2) NOT NULL
);

CREATE TABLE pedidos (
id INT AUTO_InCREMENT PRIMARY KEY,
item_id INT,
wauntidade INT,
FOREING KEY (item_id) PREFERENCES items(id)
);