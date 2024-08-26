const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

//buscar si existe 
const protect = asyncHandler(async (req, res, next) => {

    let token 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //obtener el token
            //traemos la segunda posicion es decir 1 para tener el token
            token = req.headers.authorization.split(' ')[1]
            //verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //obtener los datos del usuario logueado
            //seleccionas todo menos el password por eso va asi -password
            req.user = await User.findById(decoded.id).select('-password')
            
            next()


        } catch (error){
            res.status(401)
            throw new Error('Acceso no autorizado')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Acceso no autorizado, no se proporcionó un token')
    }
})

module.exports = {
    protect
}