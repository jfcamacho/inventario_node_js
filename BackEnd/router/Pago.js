const Express = require('express');
const PagoModel = require('../models').Pago
const PagoRouter = Express.Router();
const Autenticar = require('../middlewares/autenticar')

PagoRouter.get('/', Autenticar, (req, res) => {
    PagoModel.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

PagoRouter.post('/', Autenticar, (req, res) => {
    PagoModel.create(req.body)
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

PagoRouter.put('/:idPago', Autenticar, (req, res) => {
    PagoModel.update(req.body, {
        where: {id: req.params.idPago}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

PagoRouter.delete('/:idPago', Autenticar, (req, res) => {
    PagoModel.destroy({
        where: {id: req.params.idPago}
    })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).json('Error: ' + err)
    });
})

module.exports = PagoRouter
