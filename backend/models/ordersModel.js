const mongoose = require('mongoose')

const pedidoSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    productos: [{
        producto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1
    },
    precio:{
        type: Number,
        required: true
    }
}],
    total:{
        type: Number,
        required: true
        },
    estado:{
        type: String,
        enum: ['pendiente', 'enviado', 'recibido','cancelado'],
        default: 'pendiente'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Pedido', pedidoSchema)