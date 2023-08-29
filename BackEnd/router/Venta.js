const Express = require('express');
const VentaModel = require('../models').Venta
const InventarioModel = require('../models').Inventario
const VentaRouter = Express.Router();
const Autenticar = require('../middlewares/autenticar')
const { Op } = require('sequelize')

VentaRouter.get('/', Autenticar, (req, res) => {
    VentaModel.findAll({
        offset: 1*parseInt(req.body.offset),
        limit: parseInt(req.body.limit),
        where: {
            idEstado: req.body.idEstado,
            idUsuario: {[Op.like]: `%${req.body.idUsuario}`},
            idInventario: {[Op.like]: `%${req.body.idInventario}`},
            idFactura: {[Op.like]: `%${req.body.idFactura}`}

        }
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

VentaRouter.post('/', Autenticar, (req, res) => {
    InventarioModel.findOne({
        where: {
            id: req.body.idInventario
        },
        raw: true
    })
    .then((producto) => {
        VentaModel.create(req.body)
        .then((Venta) => {
            producto.stock -= parseInt(Venta.ct_total)
            producto.pr_venta = Venta.costo/Venta.ct_total
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

VentaRouter.put('/:idVenta', Autenticar, (req, res) => {
    VentaModel.update(req.body, {
        where: {id: req.params.idVenta}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

VentaRouter.delete('/:idVenta', Autenticar, (req, res) => {
    VentaModel.destroy({
        where: {id: req.params.idVenta}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

module.exports = VentaRouter
