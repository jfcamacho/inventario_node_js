const Express = require('express')
const AuthRouter = Express.Router()
const UsuarioModel = require('../models').Usuario
const Bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')
const Config = require('config')

AuthRouter.post('/', (req, res) => {
    UsuarioModel.findOne({
        where: {
            correo: req.body.correo,
            idEstado: 1
        }
    })
    .then((result) => {
        if(result){
            let validarPassword = Bcrypt.compareSync(req.body.password, result.password)
            if(validarPassword){
                let user = {Usuario: {'Nombres': result.nombres, 'Correo': result.correo}}
                let jwt = Jwt.sign(user, Config.get("SEED.password"), {expiresIn: Config.get("SEED.ExpiresIn")})
                process.env.token = jwt
                res.status(200).json({"Usuario": user, "Token": process.env.token})
            }else{
                res.status(400).json('Msj', 'Usuario o contraseña incorrecto')
            }
        }else{
            res.status(400).json('Msj', 'Usuario o contraseña incorrecto')
        }
    }).catch((err) => {
        res.status(400).json({'Error': err})
    });
})

module.exports = AuthRouter