const asyncHandler = require('express-async-handler')
const Pedido = require('../models/ordersModel')
//const Producto = require('../models/productModel')


//Mostrar todos los pedidos
const getOrders = asyncHandler(async(req, res) => {
    //const orders = await Pedido.find().populate('user', 'name email')
    try{
    //const pedidos = await Pedido.find()
    console.log('User ID:', req.user.id, req.user.name)
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: 'No tienes permiso para ver todos los pedidos' });
    }
    const pedidos = await Pedido.find({ user: req.user.id })
    // if(pedidos.user.toString() !== req.user.id) {
    // return res.status(403).json({ message: 'No tienes permiso para ver este pedido' });
    // }
    res.status(200).json(pedidos)
    }catch(error){
        res.status(500).json({message: 'Error al obtener los pedidos', error})
        }

})

//Mostrar un pedido en especifico
const getOrdersSearch = asyncHandler(async (req, res) =>{
    const { id } = req.params
    try{
    const pedido = await Pedido.findById(id)
    if(!pedido){
        res.status(404).json({message: 'Pedido no encontrado'})
        }
    if(pedido.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'No tienes permiso para ver este pedido' });
    }
    //if (orders.user.toString() !== req.user.id && req.user.role !== 'admin') {
    //return res.status(403).json({ message: 'No tienes permiso para ver este pedido' });
    //}    
    res.status(200).json(pedido)
    }catch(error){
        res.status(500).json({message: 'Error al obtener el pedido', error})
        }
    })

   
//Crear un nuevo pedido
const createOrders = asyncHandler(async (req, res) => {
    const {productos, total, estado} = req.body
    
    if(!productos || !total || !estado){
        res.status(400);
        throw new Error('Faltan campos')
    }
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


const updateOrders = asyncHandler(async(req, res) => {
    const pedido = await Pedido.findById(req.params.id)
    if(!pedido){
        res.status(404)
        throw new Error('Pedido no encontrado')
    } else{
        const pedidoUpdate = await Pedido.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        )
        res.status(200).json({ message: "Pedido actualizado", pedidoUpdate})
    }
})

const deleteOrders = asyncHandler(async(req, res) => {
const pedido = await Pedido.findById(req.params.id)
if(!pedido){
    res.status(404)
    throw new Error('Pedido no encontrado')
    } 
    await Pedido.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Pedido eliminado', id: req.params.id})

 
})

module.exports = {
    getOrders,
    getOrdersSearch,
    createOrders,
    updateOrders,
    deleteOrders
}
