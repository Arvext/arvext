require("dotenv").config();

const express = require("express");
const session = require("express-session");
const path = require("path");

// Inicializa la base de datos
require("./database/db");

const userModel=require("./models/userModel");

userModel.crearAdmin();

const app = express();
const PORT = process.env.PORT || 3000;

// ===============================
// RUTAS
// ===============================

const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");

// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "arvext",
    resave: false,
    saveUninitialized: false,
  })
);

// ===============================
// ARCHIVOS ESTÁTICOS
// ===============================

app.use(express.static(path.join(__dirname, "public")));

// ===============================
// API
// ===============================

app.use("/api", apiRoutes);
app.use("/api", authRoutes);

// ===============================
// RUTAS WEB
// ===============================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Dashboard (por ahora sin protección)
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// ===============================
// ERROR 404
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

// ===============================
// INICIAR SERVIDOR
// ===============================

app.listen(PORT, () => {
  console.log("");
  console.log("======================================");
  console.log("        ARVEXT Analytics");
  console.log("======================================");
  console.log(`Servidor: http://localhost:${PORT}`);
  console.log("");
});