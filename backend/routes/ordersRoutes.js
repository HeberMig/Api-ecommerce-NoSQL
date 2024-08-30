const express = require('express')
const router = express.Router()

const { getOrders, getOrdersSearch, createOrders } = require('../controllers/ordersControllers')
const { protect } = require('../middleware/authMiddleware')
const { authorizeRoles } = require('../middleware/authorizeRolesMiddleware')


//enpoint incial : api/orders/
//api/orders
router.get('/', getOrders)//Mostrar todos los pedidos
router.get('/:id', getOrdersSearch)//Mostrar un solo pedido
router.post('/',protect, authorizeRoles('user'), createOrders)//Crear pedido

module.exports = router