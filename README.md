

# Programación Web - API Práctica 1

API desarrollada con **Express** y **PostgreSQL** para gestión de usuarios y posts.  
Permite registrar usuarios, iniciar sesión, crear mensajes tipo blog, seguir y dejar de seguir usuarios, y consultar mensajes filtrados o timeline de usuarios seguidos.


## Requisitos

- Node.js >= 18
- PostgreSQL
- npm o yarn
- Git Bash
- Visual Studio Code


## Instalación y ejecución

1. Clonar el repositorio:

git clone https://github.com/LilyParedes/Practica1.git

2. Instalar dependencias, ingresa a gitbash y ejecuta:

npm install

3. Instalar JWT, ingresa a gitbash y ejecuta


npm install jsonwebtoken


4. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto y agrega una clave larga y segura luego del '=':

JWT_SECRET= 


5. Configurar la base de datos

En `database/db.js` verifica que las credenciales sean correctas:

```js
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "practica1",
  password: "TUCONTRASEÑA",
  port: 5432
});
```

Ejecuta en PostgreSQL el script para crear las tablas necesarias (`users`, `posts`, `follows`).

6. Iniciar el servidor, ingresa a gitbash y ejecuta:

node index.js


Servidor disponible en:

* API → `http://localhost:3000`
* Documentación Swagger → `http://localhost:3000/api/docs`

---

## Endpoints principales

* **POST /api/auth/register** → Registrar nuevo usuario
* **POST /api/auth/login** → Iniciar sesión
* **GET /api/users** → Listar todos los usuarios
* **GET /api/users/{name}** → Obtener información de un usuario
* **DELETE /api/users/{name}** → Eliminar usuario
* **POST /api/users/{name}/follow** → Seguir usuario
* **DELETE /api/users/{name}/follow** → Dejar de seguir usuario
* **POST /api/posts** → Crear mensaje
* **GET /api/posts/latest** → Últimos 10 mensajes
* **GET /api/posts/user/{name}** → Mensajes de un usuario
* **GET /api/posts/search?q=texto** → Buscar mensajes por texto
* **GET /api/posts/timeline** → Timeline de usuarios seguidos

> **Nota:** Las rutas que requieren autenticación deben enviar el token JWT en el header:

Authorization: Bearer <tu_token>, aparece en la esquina superior del Swagger


## Tecnologías usadas

* Node.js + Express
* PostgreSQL
* JWT (`jsonwebtoken`)
* Swagger UI
* OpenAPI YAML

---

## Esquema de base de datos

```sql
-- Crear base de datos
CREATE DATABASE practica1;

-- Tabla de usuarios
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de mensajes
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de follows (relación de seguidores)
CREATE TABLE follows (
  id SERIAL PRIMARY KEY,
  follower_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (follower_id, following_id)
);


```
## Ejemplo de uso

1. Registrar usuario → `/api/auth/register`
2. Iniciar sesión → `/api/auth/login` (obtienes token JWT)
3. Crear post → `/api/posts` (envías token en Authorization)
4. Seguir usuario → `/api/users/{name}/follow`
5. Consultar timeline → `/api/posts/timeline`



