const express = require("express");
const router = express.Router();

const visitController = require("../controllers/visitController");
const db = require("../database/db");

// Registrar visita
router.post("/visita", visitController.registrar);

// Obtener visitas
router.get("/visitas", visitController.listar);

// Exportar CSV
router.get("/exportar", (req, res) => {

    db.all("SELECT * FROM visitas ORDER BY id DESC", (err, rows) => {

        if (err) {
            return res.status(500).send(err);
        }

        if (rows.length === 0) {
            return res.send("No hay datos.");
        }

        const columnas = Object.keys(rows[0]);

        let csv = columnas.join(",") + "\n";

        rows.forEach(fila => {
            csv += columnas.map(c => `"${fila[c] ?? ""}"`).join(",") + "\n";
        });

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=visitas.csv"
        );

        res.setHeader("Content-Type", "text/csv");

        res.send(csv);

    });

});

// Borrar visitas
router.delete("/borrar", (req, res) => {

    db.run("DELETE FROM visitas", err => {

        if (err) {
            return res.status(500).json(err);
        }

        db.run("DELETE FROM sqlite_sequence WHERE name='visitas'");

        res.json({
            success: true
        });

    });

});

module.exports = router;