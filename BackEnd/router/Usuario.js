const Express = require('express')
const UsuarioModel = require('../models').Usuario
const {Op} = require('sequelize')
const Bcrypt = require('bcrypt')
const Autenticar = require('../middlewares/autenticar')

const UsuarioRouter = Express.Router()

UsuarioRouter.get('/', Autenticar, (req, res) => {
    UsuarioModel.findAll({
        offset: 0*parseInt(req.body.offset),
        limit: parseInt(req.body.limit),
        where: {[Op.and]: [
            {idEstado: req.body.idEstado},
            {nombres: {[Op.like]: `%${req.body.nombres}%`}},
            {correo: {[Op.like]: `%${req.body.correo}%`}}
        ]}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json({'Error': err})
    });
})

UsuarioRouter.post('/', Autenticar, (req, res) => {

    Bcrypt.hash(req.body.password, 10)
    .then((result) => {
        req.body.password = result

        UsuarioModel.findOrCreate({
            where: {correo: req.body.correo},
            defaults: req.body
        })
        .then(([user, created]) => {
            if(!created){
                res.status(200).json({'Error': `El correo ${req.body.correo} ya ha sido registrado`})
            }else{
                res.status(200).json({'Usuario': user})
            }
        }).catch((err) => {
            res.status(400).json({'Error': err})
        });
    })
})

UsuarioRouter.put('/:idUsuario', Autenticar, (req, res) => {
    Bcrypt.hash(req.body.password, 10)
    .then((result) => {
        req.body.password = result
        UsuarioModel.update(req.body, {
            where: {id: req.params.idUsuario}
        })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(400).json({'Error': err})
        });
    })
})

UsuarioRouter.delete('/:idUsuario', (req, res) => {
    UsuarioModel.destroy({
        where: {id: req.params.idUsuario}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json({'Error': err})
    });
})


module.exports = UsuarioRouter