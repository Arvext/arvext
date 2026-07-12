const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
    path.join(__dirname, "database.db"),
    (err) => {
        if (err) {
            console.error("❌ Error al abrir la base de datos:", err.message);
        } else {
            console.log("✅ Base de datos conectada.");
        }
    }
);

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS visitas (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            ip TEXT,

            fecha TEXT,

            hora TEXT,

            timestamp TEXT,

            navegador TEXT,

            sistema TEXT,

            dispositivo TEXT,

            idioma TEXT,

            pantalla TEXT,

            plataforma TEXT,

            zonaHoraria TEXT,

            pagina TEXT,

            referer TEXT

        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            usuario TEXT UNIQUE,

            password TEXT

        )
    `);

});

module.exports = db;