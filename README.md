# Delilah Restó

Este proyecto plantea la creación de un sistema de pedidos online para un restaurante. Deberás poner en funcionamiento las partes necesarias para montar una REST API que permita realizar altas, bajas, modi?caciones y obtención de información sobre una estructura de datos que podría consumir un cliente. Parte del desafío estará enfocado en lograr que el desarrollo del proyecto sea puesto en producción utilizando web services.

## Documentación

#### 1. Clonar repositorio

Primero se debe descargar o clonar el repositorio desde GitHub con la siguiente URL:

```
https://github.com/Sebaszam1/delilah_resto.git
```

#### 2. Instalar dependencias del proyecto

Ejecutar el siguiente para instalar las dependencias  necesarias del proyecto:

```
npm i
```

#### 3. Crear tablas

Para crear la base de datos encontrara un archivo llamado `db.sql`, con el cual se podra generar la base de datos. En el archivo `conexion.js` se pueden realizar las configuraciones pertinentes relacionadas con la ruta de la base de datos en la variable **path**.


#### 4. Añadir TOKEN_SECRET y EXPIRES

Se debe crear un archivo `.env` donde se defina el token (TOKEN_SECRET) y su tiempo de expiración (EXPIRES):

```
TOKEN_SECRET="ejemplo"
EXPIRES=10000000
```

#### 5. Iniciar el proyecto

Ejecutar el siguiente comando para poder iniciar el proyecto

```
npm run start
```

#### 6. Documentación en Swagger

En el archivo `spec.yml` encontrara la documentación.

#### 7. Endpoints

##### AUTH

| method | endpoint              | body                                                      | header | description       |
| ------ | --------------------- | --------------------------------------------------------- | ------ | ----------------- |
| POST   | /v1/auth/register | {nombre_user, email, phone, address, contrasena, id_role} |        | Create a new user without token |
| POST   | /v1/auth/login    | {email, contrasena}                                       |        | Login user   |

##### USERS

| method | endpoint              | body                                                      | header  | description                 |
| ------ | --------------------- | --------------------------------------------------------- | ------- | --------------------------- |
| GET    | /v1/users         |                                                           | {TOKEN} | Get all users (Admin)       |
| POST   | /v1/users         | {nombre_user, email, phone, address, contrasena, id_role} | {TOKEN} | Create a new user (Admin)   |
| GET    | /v1/users/:userId |                                                           | {TOKEN} | Search a user by ID (Admin) |
| PUT    | /v1/users/:userId | {id_role}                                                 | {TOKEN} | Update user role (Admin)    |
| DELETE | /v1/users/:userId | {mealsId} (params)                                        | {TOKEN} | Delete a user (Admin)       |

##### MEALS

| method | endpoint               | body                       | header  | description               |
| ------ | ---------------------- | -------------------------- | ------- | ------------------------- |
| POST   | /v1/meals              | {nombre_meal, precio, img} | {TOKEN} | Create a new meal (Admin) |
| GET    | /v1/meals              |                            |         | Get all meals             |
| GET    | /v1/meals/:mealsId     |                            |         | Search a meal by ID       |
| PUT    | /v1/meals/:mealsId     | {nombre_meal, precio, img} | {TOKEN} | Update a meal (Admin)     |
| DELETE | /v1/meals/:mealsId     | {mealsID} (params)         | {TOKEN} | Delete a meal (Admin)     |

##### ORDERS

| method | endpoint                | body                                         | header  | description                 |
| ------ | ----------------------- | -------------------------------------------- | ------- | --------------------------- |
| POST   | /v1/api/orders          | {id_user, id_meal, id_forma_pago, id_status} | {TOKEN} | Get all orders              |
| GET    | /v1/api/orders          |                                              | {TOKEN} | Create a new order (Admin)  |
| GET    | /v1/api/orders/user     |                                              | {TOKEN} | Get all orders from my user |
| PUT    | /v1/api/orders/:orderId | {orderId} (params), id_status                | {TOKEN} | Update order status (Admin) |
| DELETE | /v1/api/orders/:orderId | {orderId} (params)                           | {TOKEN} | Delete an order (Admin)     |

#### 8. Postman

El archivo `Delilah-Resto.postman_collection.json` podra ser importado a Postman con el fin de realizar las pruebas de los endpoints.