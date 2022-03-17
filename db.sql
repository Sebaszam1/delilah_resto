
CREATE DATABASE delilah_resto;

use delilah_resto;

CREATE table meals (
	id_meal int not null primary key auto_increment,
	nombre_meal varchar(255),
	precio int,
	img varchar(255),
	date_creation timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE table users (
	id_user int not null primary key auto_increment,
	nombre_user varchar(255),
	email varchar(255) not null unique,
	phone varchar(255),
	address varchar(255),
	contrasena varchar(255),
	id_role int
);

CREATE table orders (
	id_order int not null primary key auto_increment,
	id_user int,
	id_meal int,
	hora timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	id_forma_pago int,
	id_status int
);

CREATE table status (
	id_status int not null primary key auto_increment,
	nombre_status varchar(255)
);

create table users_roles(
	id_role int not null primary key auto_increment,
	nombre_role varchar(255)
);

CREATE table forma_pago (
	id_forma_pago int not null primary key auto_increment,
	nombre_forma_pago varchar(255)
);

ALTER table users add CONSTRAINT users_fk_1 FOREIGN KEY (id_role) REFERENCES users_roles (id_role);
ALTER table orders add CONSTRAINT orders_fk_1 FOREIGN KEY (id_user) REFERENCES users (id_user);
ALTER table orders add CONSTRAINT orders_fk_2 FOREIGN KEY (id_meal) REFERENCES meals (id_meal);
ALTER table orders add CONSTRAINT orders_fk_3 FOREIGN KEY (id_status) REFERENCES status (id_status);
ALTER table orders add CONSTRAINT orders_fk_4 FOREIGN KEY (id_forma_pago) REFERENCES forma_pago (id_forma_pago);

INSERT into status(nombre_status) values ('Nuevo');
INSERT into status(nombre_status) values ('Confirmado');
INSERT into status(nombre_status) values ('Preparando');
INSERT into status(nombre_status) values ('Enviando');
INSERT into status(nombre_status) values ('Entregado');


INSERT into users_roles (nombre_role) values ('admin');
INSERT into users_roles (nombre_role) values ('user');


INSERT INTO forma_pago (nombre_forma_pago) values ('Efectivo');
INSERT INTO forma_pago (nombre_forma_pago) values ('Tarjeta de débito');
INSERT INTO forma_pago (nombre_forma_pago) values ('Tarjeta de crédito');

INSERT INTO users (id_user, nombre_user, email, phone, address, contrasena, id_role) 
values (1, "Sebastian", "sebastian@mail.com", "3138246132", "Calle 187BIS 20A", "$2b$10$c5tAfN4bihspP3zdlkmgCeoi4gd1JFuDfFe5vykwHZC7t2x72KysW", 1);
INSERT INTO users (id_user, nombre_user, email, phone, address, contrasena, id_role) 
values (2, "Pepito", "pepito@mail.com", "3147895631", "Calle 20A 45C", "$2b$10$c5tAfN4bihspP3zdlkmgCeoi4gd1JFuDfFe5vykwHZC7t2x72KysW", 2);

INSERT INTO meals (nombre_meal, precio, img) 
values ("Tamal", "2000", "https://via.placeholder.com/150");
INSERT INTO meals (nombre_meal, precio, img) 
values ("Arepa", "1000", "https://via.placeholder.com/150");
INSERT INTO meals (nombre_meal, precio, img) 
values ("Pollo", "5000", "https://via.placeholder.com/150");

