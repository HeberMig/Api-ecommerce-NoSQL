const express = require('express')
const router = express.Router()

const { getOrders, getOrdersSearch, createOrders } = require('../controllers/ordersControllers')


//enpoint incial : api/orders/
router.get('/', getOrders)//Mostrar todos los pedidos
router.get('/:id', getOrdersSearch)//Mostrar un solo pedido
router.post('/', createOrders)//Crear pedido

module.exports = router