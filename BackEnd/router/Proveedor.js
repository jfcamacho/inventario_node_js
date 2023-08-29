const Express = require('express');
const ProveedorModel = require('../models').Proveedor
const ProveedorRouter = Express.Router();
const Autenticar = require('../middlewares/autenticar')

ProveedorRouter.get('/', Autenticar, (req, res) => {
    ProveedorModel.findAll()
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

ProveedorRouter.post('/', Autenticar, (req, res) => {
    ProveedorModel.create(req.body)
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

ProveedorRouter.put('/:idProveedor', Autenticar, (req, res) => {
    ProveedorModel.update(req.body, {
        where: {id: req.params.idProveedor}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

ProveedorRouter.delete('/:idProveedor', Autenticar, (req, res) => {
    ProveedorModel.destroy({
        where: {id: req.params.idProveedor}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

module.exports = ProveedorRouter
