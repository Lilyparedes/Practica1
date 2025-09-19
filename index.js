require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

// Swagger (para documentación de la API) 
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./openapi.yaml");

app.use(express.json());

app.use("/api/users", require("./routes/users"));   // Usuarios
app.use("/api/posts", require("./routes/posts"));   // Mensajes
app.use("/api/auth", require("./routes/auth"));     // Registro/Login

// Documentación Swagger 
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta de prueba
app.get("/status", (req, res) => {
  res.status(200).json({ status: "running" });
});

// Iniciar servidor 
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Puedes encontrar informacion y probar la API en: http://localhost:${port}/api/docs`);
});
