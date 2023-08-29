const Express = require('express');
const EstadoModel = require('../models').Estado
const EstadoRouter = Express.Router();
const Autenticar = require('../middlewares/autenticar')

EstadoRouter.get('/', Autenticar, (req, res) => {
    EstadoModel.findAll()
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

EstadoRouter.post('/', Autenticar, (req, res) => {
    EstadoModel.create(req.body)
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

EstadoRouter.put('/:idEstado', Autenticar, (req, res) => {
    EstadoModel.update(req.body, {
        where: {id: req.params.idEstado}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

EstadoRouter.delete('/:idEstado', Autenticar, (req, res) => {
    EstadoModel.destroy({
        where: {id: req.params.idEstado}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

module.exports = EstadoRouter
