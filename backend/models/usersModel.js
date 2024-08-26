const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true,'Al menos un apellido debe tener']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
},{
    timestamps: true
});



module.exports = mongoose.model('User', userSchema);
