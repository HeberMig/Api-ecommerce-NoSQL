const express = require('express')
const router = express.Router()
const { getProducts, getSearchProducts, createProduct, updateProducts, deleteProducts } = require('../controllers/productsControllers')
const { protect } = require('../middleware/authMiddleware')



//Enpoint de products: api/products
router.get('/', protect, getProducts)
router.get('/:id',protect, getSearchProducts)
router.post('/',protect, createProduct )
router.put('/:id',protect, updateProducts)
router.delete('/:id',protect, deleteProducts)

module.exports = router



