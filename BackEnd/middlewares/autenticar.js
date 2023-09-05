const Jwt = require('jsonwebtoken')
const Config = require('config')

function  autenticar(req, res, next) {
    let lastJwt = process.env.token
    Jwt.verify(lastJwt, Config.get("SEED.password"), (err, decoded) => {
        if(!err){
            // process.env.token = Jwt.sign({"Usuario": decoded.Usuario}, Config.get("SEED.password"), {expiresIn: Config.get("SEED.ExpiresIn")})
            next()
        }else{
            res.status(400).json({'Error': 'Para proceder con el requerimiento vuelva a ingresar'})
        }
    })
}

module.exports = autenticar