const express = require('express')
const router = express.Router()
const { getProducts, getSearchProducts, createProduct, updateProducts, deleteProducts } = require('../controllers/productsControllers')
const { protect } = require('../middleware/authMiddleware')
const { authorizeRoles } = require('../middleware/authorizeRolesMiddleware')


//Enpoint de products: api/products
router.get('/', protect, getProducts)
router.get('/:id',protect, getSearchProducts)
router.post('/',protect, authorizeRoles('admin'), createProduct )
router.put('/:id',protect, authorizeRoles('admin'),updateProducts)
router.delete('/:id',protect, authorizeRoles('admin'), deleteProducts)

module.exports = router



