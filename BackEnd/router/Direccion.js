const Express = require('express');
const DireccionModel = require('../models').Direccion
const EstadoModel = require('../models').Estado
const DireccionRouter = Express.Router()
const Autenticar = require('../middlewares/autenticar')

DireccionRouter.get('/oneDir/:idDireccion', Autenticar, (req, res) => {
    DireccionModel.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']},
        where: {id: req.params.idDireccion}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

DireccionRouter.get('/:idUsuario', Autenticar, (req, res) => {
    DireccionModel.findAll({
        where: {idUsuario: req.params.idUsuario, idEstado: 1},
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: {model: EstadoModel, attributes: {exclude: ['createdAt', 'updatedAt']}},
        order: ['id']
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

DireccionRouter.post('/', Autenticar, (req, res) => {
    DireccionModel.create(req.body)
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

DireccionRouter.put('/:idDireccion', Autenticar, (req, res) => {
    DireccionModel.update(req.body, {
        where: {id: req.params.idDireccion}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

DireccionRouter.delete('/:idDireccion', Autenticar, (req, res) => {
    DireccionModel.update({idEstado: 3},{
        where: {id: req.params.idDireccion}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

module.exports = DireccionRouter