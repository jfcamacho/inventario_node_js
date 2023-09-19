const Express = require('express');
const ProveedorModel = require('../models').Proveedor
const EstadoModel = require('../models').Estado
const DireccionModel = require('../models').Direccion
const PagoModel = require('../models').Pago
const ProveedorRouter = Express.Router();
const Autenticar = require('../middlewares/autenticar')

ProveedorRouter.get('/', Autenticar, (req, res) => {
    ProveedorModel.findAll({
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

ProveedorRouter.get('/:idProveedor', Autenticar, (req, res) => {
    ProveedorModel.findOne({
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: [
            {model: EstadoModel, attributes: {exclude: ['createdAt', 'updatedAt']}},
            {model: PagoModel, include: {model: EstadoModel, attributes: {exclude: ['createdAt', 'updatedAt']}},attributes: {exclude: ['createdAt', 'updatedAt']}},
        ],
        order: ['id'],
        where: {id: req.params.idProveedor}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

ProveedorRouter.post('/', Autenticar, (req, res) => {
    ProveedorModel.create(req.body)
    .then((result) => {
        res.status(200).json({'Proveedor': result})
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
