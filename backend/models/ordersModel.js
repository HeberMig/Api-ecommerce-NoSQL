const mongoose = require('mongoose')

const pedidoSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    order: {
        type: String,
        required: [true, 'Por favor crear un pedido']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Pedido', pedidoSchema)