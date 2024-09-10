const express = require('express')
const router = express.Router()

const { getOrders, getOrdersSearch, createOrders, updateOrders, deleteOrders } = require('../controllers/ordersControllers')
const { protect } = require('../middleware/authMiddleware')
const { authorizeRoles } = require('../middleware/authorizeRolesMiddleware')


//enpoint incial : api/orders/
//api/orders
router.get('/', protect, authorizeRoles('user'), getOrders)//Mostrar todos los pedidos
router.get('/:id', protect, authorizeRoles('user'), getOrdersSearch)//Mostrar un solo pedido
router.post('/',protect, authorizeRoles('user'), createOrders)//Crear pedido
router.put('/:id',protect, authorizeRoles('user'), updateOrders)
router.delete('/:id',protect, authorizeRoles('user'), deleteOrders)

module.exports = router