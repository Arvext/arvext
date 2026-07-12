const UAParser = require("ua-parser-js");
const visitModel = require("../models/visitModel");

function registrar(req, res) {

    const parser = new UAParser(req.headers["user-agent"]);
    const result = parser.getResult();

    const ahora = new Date();

    visitModel.guardarVisita({

        ip:
            req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress,

        fecha:
            ahora.toLocaleDateString(),

        hora:
            ahora.toLocaleTimeString(),

        timestamp:
            ahora.toISOString(),

        navegador:
            (result.browser.name || "Desconocido") +
            " " +
            (result.browser.version || ""),

        sistema:
            (result.os.name || "Desconocido") +
            " " +
            (result.os.version || ""),

        dispositivo:
            result.device.type || "PC",

        idioma:
            req.body.idioma ||
            req.headers["accept-language"],

        pantalla:
            req.body.pantalla || "",

        plataforma:
            req.body.plataforma || "",

        zonaHoraria:
            req.body.zonaHoraria || "",

        pagina:
            req.body.pagina || "/",

        referer:
            req.body.referer || "Directo"

    });

    res.json({
        success: true
    });

}

function listar(req, res) {

    visitModel.obtenerVisitas((err, rows) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(rows);

    });

}

module.exports = {

    registrar,

    listar

};