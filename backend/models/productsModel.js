const mongoose = require('mongoose')

const productoSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Por favor introduzca el nombre del producto']
    },
    description: {
        type: String,
        required: [true, 'Por favor introduzca la descripción del producto']
        },
    price: {
        type: Number,
        required: [true, 'Por favor introduzca el precio del producto'],
    },
    image: {
        type: String,
        required: [true, 'Por favor introduzca la imagen del producto']
    },
    category: {
        type: String,
        required: [true, 'Por favor introduzca la categoría del producto']
    },
},{
    timestamps: true
})

module.exports = mongoose.model('Producto', productoSchema)