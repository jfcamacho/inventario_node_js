const Express = require('express');
const autenticar = require('../middlewares/autenticar');
const AsocProdProvModel = require('../models').AsocProdProv
const ProveedorModel = require('../models').Proveedor

const AsocProdProvRouter = Express.Router()

AsocProdProvRouter.get('/', autenticar, (req, res) => {
    AsocProdProvModel.findAll({
        where: {idEstado: 1}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json({'Error': err})
    });
})

AsocProdProvRouter.get('/prodprov/:idProveedor', autenticar, (req, res) => {
    AsocProdProvModel.findAll({
        where: {idEstado: 1, idProveedor: req.params.idProveedor}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json({'Error': err})
    });
})

AsocProdProvRouter.get('/provprod/:idProducto', (req, res) => {
    console.log(req.params.idProducto);
    AsocProdProvModel.findAll({
        where: {idEstado: 1, idProducto: req.params.idProducto},
        include: {model: ProveedorModel, attributes: ['razon_social', 'nom_contacto', 'tel_contacto']},
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json({'Error': err})
    });
})

AsocProdProvRouter.post('/', autenticar, (req, res) => {
    AsocProdProvModel.create(req.body)
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json({'Error': err})
    });
})

AsocProdProvRouter.put('/:idAsoc', autenticar, (req, res) => {
    AsocProdProvModel.update(req.body, {
        where: {id: req.params.idAsoc}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json({'Error': err})
    });
})

AsocProdProvRouter.delete('/:idAsoc', autenticar, (req, res) => {
    AsocProdProvModel.update({idEstado: 3}, {
        where: {id: req.params.idAsoc}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json({'Error': err})
    });
})

module.exports = AsocProdProvRouter