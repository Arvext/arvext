const db = require("../database/db");

function guardarVisita(datos) {

    db.run(

        `INSERT INTO visitas (

            ip,
            fecha,
            hora,
            timestamp,

            navegador,
            sistema,
            dispositivo,

            idioma,

            pantalla,

            plataforma,

            zonaHoraria,

            pagina,

            referer

        )

        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,

        [

            datos.ip,
            datos.fecha,
            datos.hora,
            datos.timestamp,

            datos.navegador,
            datos.sistema,
            datos.dispositivo,

            datos.idioma,

            datos.pantalla,

            datos.plataforma,

            datos.zonaHoraria,

            datos.pagina,

            datos.referer

        ],

        (err) => {

            if (err) {

                console.error("❌ Error al guardar visita:", err.message);

            }

        }

    );

}

function obtenerVisitas(callback) {

    db.all(

        "SELECT * FROM visitas ORDER BY id DESC",

        callback

    );

}

function total(callback) {

    db.get(

        "SELECT COUNT(*) AS total FROM visitas",

        callback

    );

}

module.exports = {

    guardarVisita,

    obtenerVisitas,

    total

};