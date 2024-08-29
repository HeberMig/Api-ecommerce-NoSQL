const asyncHandler = require('express-async-handler')
//const Order = require('../models/ordersModel')
//const Product = require('../models/productModel')


//Mostrar todos los pedidos
const getOrders = asyncHandler(async (req, res) => {
    //const { name, lastName, email, password} = req.body
    res.status(200).json({
        message: "Mostrar pedidos",
    })

})

//Mostrar un pedido en especifico
const getOrdersSearch = asyncHandler(async (req, res) =>{
    res.status(200).json({
        message: "Buscar pedido por id"
    })})

   
//Crear un nuevo pedido
const createOrders = asyncHandler(async (req, res) => {
    const {productos, total} = req.body
    res.status(201).json({
        message: "Crear pedido",
    })

})

// const updateOrders = (async (req, res) => {
//     //const { name, lastName, email, password} = req.body
//     res.status(200).json({
//         message: "Actualizar Orden",
//     })

// })

// const deleteOrders = (async (req, res) => {
//     //const { name, lastName, email, password} = req.body
//     res.status(200).json({
//         message: "Eliminar pedido",
//     })

// })

module.exports = {
    getOrders,
    getOrdersSearch,
    createOrders
}
