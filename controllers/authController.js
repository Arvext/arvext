const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

async function login(req,res){

    const {usuario,password}=req.body;

    userModel.login(

        usuario,

        async(err,user)=>{

            if(!user){

                return res.json({

                    success:false

                });

            }

            const ok=await bcrypt.compare(

                password,

                user.password

            );

            if(!ok){

                return res.json({

                    success:false

                });

            }

            req.session.user=user.usuario;

            res.json({

                success:true

            });

        }

    );

}

function logout(req,res){

    req.session.destroy(()=>{

        res.redirect("/login");

    });

}

module.exports={

    login,

    logout

};