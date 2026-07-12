const db = require("../database/db");
const bcrypt = require("bcrypt");

function crearAdmin() {

    const usuario = "admin";
    const password = "123456";

    db.get(
        "SELECT * FROM usuarios WHERE usuario = ?",
        [usuario],
        async (err, row) => {

            if (row) return;

            const hash = await bcrypt.hash(password, 10);

            db.run(
                "INSERT INTO usuarios(usuario,password) VALUES(?,?)",
                [usuario, hash]
            );

            console.log("✅ Usuario admin creado");
        }
    );

}

function login(usuario, callback){

    db.get(

        "SELECT * FROM usuarios WHERE usuario=?",

        [usuario],

        callback

    );

}

module.exports = {

    crearAdmin,

    login

};