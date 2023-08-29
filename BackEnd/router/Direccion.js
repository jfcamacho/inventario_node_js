const Express = require('express');
const DireccionModel = require('../models').Direccion
const DireccionRouter = Express.Router()
const Autenticar = require('../middlewares/autenticar')

DireccionRouter.get('/', Autenticar, (req, res) => {
    DireccionModel.findAll()
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

DireccionRouter.get('/:idUsuario', Autenticar, (req, res) => {
    DireccionModel.findAll({
        where: {idUsuario: req.params.idUsuario}
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
    DireccionModel.destroy({
        where: {id: req.params.idDireccion}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

module.exports = DireccionRouter