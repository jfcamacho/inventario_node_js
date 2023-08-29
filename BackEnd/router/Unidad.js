const Express = require('express');
const UnidadModel = require('../models').Unidad
const UnidadRouter = Express.Router();
const Autenticar = require('../middlewares/autenticar')

UnidadRouter.get('/', Autenticar, (req, res) => {
    UnidadModel.findAll()
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
