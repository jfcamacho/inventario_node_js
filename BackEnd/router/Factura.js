const Express = require('express');
const FacturaModel = require('../models').Factura
const UsuarioModel = require('../models').Usuario
const EstadoModel = require('../models').Estado
const ProveedorModel = require('../models').Proveedor
const FacturaRouter = Express.Router();
const Autenticar = require('../middlewares/autenticar')

FacturaRouter.get('/:idEstado', Autenticar, (req, res) => {
    FacturaModel.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: [
            {model: ProveedorModel, attributes: ['razon_social']},
            {model: UsuarioModel, attributes: ['nombres']},
            {model: EstadoModel, attributes: ['descripcion']}
        ],
        where: {idEstado: req.params.idEstado}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

FacturaRouter.post('/', Autenticar, (req, res) => {
    FacturaModel.create(req.body)
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

FacturaRouter.put('/:idFactura', Autenticar, (req, res) => {
    FacturaModel.update(req.body, {
        where: {id: req.params.idFactura}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

FacturaRouter.delete('/:idFactura', Autenticar, (req, res) => {
    FacturaModel.update({idEstado: 3},{
        where: {id: req.params.idFactura}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

module.exports = FacturaRouter
