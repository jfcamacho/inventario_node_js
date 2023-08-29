const Express = require('express');
const CategoriaModel = require('../models').Categoria
const CategoriaRouter = Express.Router();
const Autenticar = require('../middlewares/autenticar')

CategoriaRouter.get('/', Autenticar, (req, res) => {
    CategoriaModel.findAll()
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

CategoriaRouter.post('/', Autenticar, (req, res) => {
    CategoriaModel.create(req.body)
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

CategoriaRouter.put('/:idCategoria', Autenticar, (req, res) => {
    CategoriaModel.update(req.body, {
        where: {id: req.params.idCategoria}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

CategoriaRouter.delete('/:idCategoria', Autenticar, (req, res) => {
    CategoriaModel.destroy({
        where: {id: req.params.idCategoria}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

module.exports = CategoriaRouter
