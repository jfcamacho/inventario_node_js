const Express = require('express');
const CompraModel = require('../models').Compra
const InventarioModel = require('../models').Inventario
const CompraRouter = Express.Router();
const Autenticar = require('../middlewares/autenticar')
const { Op } = require('sequelize')

CompraRouter.get('/', Autenticar, (req, res) => {
    CompraModel.findAll({
        offset: 1*parseInt(req.body.offset),
        limit: parseInt(req.body.limit),
        where: {
            idEstado: req.body.idEstado,
            idUsuario: {[Op.like]: `%${req.body.idUsuario}`},
            idInventario: {[Op.like]: `%${req.body.idInventario}`},
            idFactura: {[Op.like]: `%${req.body.idFactura}`}

        },
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

CompraRouter.post('/', Autenticar, (req, res) => {
    InventarioModel.findOne({
        where: {
            id: req.body.idInventario
        },
        raw: true
    })
    .then((producto) => {
        CompraModel.create(req.body)
        .then((compra) => {
            producto.stock += parseInt(compra.ct_total)
            producto.pr_compra = compra.costo/compra.ct_total
        })
        .then(() => {
            InventarioModel.update( producto, {
                where: {
                    id: producto.id
                }
            })
            .then((result) => {
                res.status(200).json({'Msj': 'El producto se ingreso correctamente', 'Inventario': result})
            }).catch((err) => {
                res.status(401).json('Error: ' + err)
            });
        }).catch((err) => {
            res.status(401).json('Error: ' + err)
        });
    }).catch((err) => {
        res.status(404).json('Error: ' + err)
    });
})

CompraRouter.put('/:idCompra', Autenticar, (req, res) => {
    CompraModel.update(req.body, {
        where: {id: req.params.idCompra}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

CompraRouter.delete('/:idCompra', Autenticar, (req, res) => {
    CompraModel.destroy({
        where: {id: req.params.idCompra}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

module.exports = CompraRouter
