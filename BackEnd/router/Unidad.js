const Express = require('express');
const UnidadModel = require('../models').Unidad
const EstadoModel = require('../models').Estado
const UnidadRouter = Express.Router();
const Autenticar = require('../middlewares/autenticar')

UnidadRouter.get('/', Autenticar, (req, res) => {
    UnidadModel.findAll({
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

UnidadRouter.post('/', Autenticar, (req, res) => {
    UnidadModel.create(req.body)
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

UnidadRouter.put('/:idUnidad', Autenticar, (req, res) => {
    UnidadModel.update(req.body, {
        where: {id: req.params.idUnidad}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

UnidadRouter.delete('/:idUnidad', Autenticar, (req, res) => {
    UnidadModel.destroy({
        where: {id: req.params.idUnidad}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

module.exports = UnidadRouter
