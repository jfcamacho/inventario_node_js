const Express = require('express');
const InventarioModel = require('../models').Inventario
const CategoriaModel = require('../models').Categoria
const UnidadModel = require('../models').Unidad
const InventarioRouter = Express.Router();
const Autenticar = require('../middlewares/autenticar')
const {Op, Sequelize} = require('sequelize')
const sequelize = new Sequelize('sqlite::memory:');

InventarioRouter.get('/', (req, res) => {
    InventarioModel.findAll({
        where: {idEstado: 1},
        include: [
            {model: UnidadModel, attributes: ['abreviatura']},
            {model: CategoriaModel, attributes: ['nombre']}
        ],
        attributes: {
            include: [[sequelize.literal(`(SELECT COUNT(*) FROM AsocProdProvs as fab WHERE fab.idProducto = Inventario.id and fab.idEstado = 1)`), 'proveedores']],
            exclude: ['createdAt', 'updatedAt']
        }
        
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

InventarioRouter.get('/:idProducto', (req, res) => {
    InventarioModel.findOne({
        where: {id: req.params.idProducto},
        
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
    InventarioModel.update({idEstado: 3},{
        where: {id: req.params.idInventario}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

module.exports = InventarioRouter

