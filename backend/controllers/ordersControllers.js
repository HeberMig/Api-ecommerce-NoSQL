const asyncHandler = require('express-async-handler')
const Pedido = require('../models/ordersModel')
//const Producto = require('../models/productModel')


//Mostrar todos los pedidos
const getOrders = asyncHandler(async (req, res) => {
    //const orders = await Pedido.find().populate('user', 'name email')
    const orders = await Pedido.find()
    res.status(200).json(orders)

})

//Mostrar un pedido en especifico
const getOrdersSearch = asyncHandler(async (req, res) =>{
    const {id} = req.params

    if(!id){
        res.status(400)
        throw new Error("No se proporciono el id")
    }
    const orders = await Pedido.findById(id)
    if(!orders){
        res.status(404)
        throw new Error("No se encontro el pedido")
    }
    res.status(200).json(orders)
    })

   
//Crear un nuevo pedido
const createOrders = asyncHandler(async (req, res) => {
    const {productos, total, estado} = req.body
    
    if(!productos || !total || !estado){
        res.status(400);
        throw new Error('Faltan campos')
    }
    // const existePedido = await Pedido.findOne({ productos })
    // if(existePedido){
    //     res.status(400)
    //     throw new Error('El pedido ya existe')
    //     }
    const pedido = await Pedido.create({
        user: req.user.id,
        productos, 
        total,
        estado,
    })
    if(pedido){
        res.status(201).json({
            message: "Pedido creado con exito",
            _id: pedido.id,
            user: pedido.user,
            productos: pedido.productos,
            total: pedido.total,
            estado: pedido.estado,
    })
} else {
    res.status(400)
        throw new Error('Error al crear el pedido')
}

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
