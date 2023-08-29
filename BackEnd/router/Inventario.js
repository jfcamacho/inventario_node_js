const Express = require('express');
const InventarioModel = require('../models').Inventario
const InventarioRouter = Express.Router();
const Autenticar = require('../middlewares/autenticar')
const {Op} = require('sequelize')

InventarioRouter.get('/', Autenticar, (req, res) => {

    InventarioModel.findAll({
        offset: 1*parseInt(req.body.offset),
        limit: parseInt(req.body.limit),
        where: {[Op.and]: [
            {idEstado: req.body.idEstado},
            {nombre: {[Op.like]: `%${req.body.nombre}%`}},
            {idCategoria: {[Op.like]: `%${req.body.idCategoria}`}}
        ]}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

InventarioRouter.post('/', Autenticar, (req, res) => {
    InventarioModel.create(req.body)
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

InventarioRouter.put('/:idInventario', Autenticar, (req, res) => {
    InventarioModel.update(req.body, {
        where: {id: req.params.idInventario}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

InventarioRouter.delete('/:idInventario', Autenticar, (req, res) => {
    InventarioModel.destroy({
        where: {id: req.params.idInventario}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

module.exports = InventarioRouter
