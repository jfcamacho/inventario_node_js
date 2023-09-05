const Express = require('express')
const UsuarioModel = require('../models').Usuario
const EstadoModel = require('../models').Estado
const {Op} = require('sequelize')
const Bcrypt = require('bcrypt')
const Autenticar = require('../middlewares/autenticar')

const UsuarioRouter = Express.Router()

UsuarioRouter.get('/', Autenticar, (req, res) => {
    // UsuarioModel.findAll({
    //     offset: 0*parseInt(req.body.offset),
    //     limit: parseInt(req.body.limit),
    //     where: {[Op.and]: [
    //         {idEstado: req.body.idEstado},
    //         {nombres: {[Op.like]: `%${req.body.nombres}%`}},
    //         {correo: {[Op.like]: `%${req.body.correo}%`}}
    //     ]}
    // })
    UsuarioModel.findAll({
        attributes: {exclude: ['password']},
        include: {model: EstadoModel , attributes: ['abreviatura', 'descripcion']},
        where: {idEstado: {[Op.not]: 3}},
        order: ['id']
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


UsuarioRouter.get('/:idUsuario', Autenticar, (req, res) => {
    UsuarioModel.findOne({
        attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
        where: {id: req.params.idUsuario},
        include: {model: EstadoModel, attributes: ['id', 'abreviatura', 'descripcion']}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json({'Error': err})
    });
})

UsuarioRouter.put('/:idUsuario', Autenticar, (req, res) => {
    Bcrypt.hash(req.body.password, 10)
    .then((result) => {
        req.body.password = result
    })
    .catch(() => {
    })
    .finally(() => {

        UsuarioModel.update(req.body, {
            where: {id: req.params.idUsuario}
        })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(400).json({'Error': err})
        })
    })
})

UsuarioRouter.delete('/:idUsuario', (req, res) => {
    UsuarioModel.update({idEstado: 3},{
        where: {id: req.params.idUsuario} 
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json({'Error': err})
    });
})


module.exports = UsuarioRouter