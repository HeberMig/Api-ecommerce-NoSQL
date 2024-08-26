const Order = require('../models/ordersModel')


//Mostrar todos los pedidos
const getOrders = (async (req, res) => {
    //const { name, lastName, email, password} = req.body
    res.status(200).json({
        message: "Mostrar pedidos",
    })

})

//Mostrar un pedido en especifico
const getOrdersSearch = (async (req, res) =>{
    res.status(200).json({
        message: "Buscar pedido por id"
    })})

   
//Crear un nuevo pedido
const createOrders = (async (req, res) => {
    //const { name, lastName, email, password} = req.body
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
