const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const registrarUser = asyncHandler(async (req, res) => {
  //hacemos una destructuracion
  const { name, lastName, email, password, role } = req.body

  if (!name || !lastName || !email || !password || !role) {
    res.status(400);
    throw new Error("Todos los campos son obligatorios")

  }
    //Verificar si el usuario ya existess-
    const existeUsuario = await User.findOne({ email });

    if (existeUsuario) {
      res.status(400);
      throw new Error("El usuario ya existe")
    } else {
      //hashear la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt)
      //crear usuario
      const user = await User.create({
        name,
        lastName,
        email,
        password: hashedPassword,
        role,
      })
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        })
      } else {
        res.status(400);
        throw new Error("No se pudo crear el usuario")
      }
    }

})

const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: generarToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Credenciales incorrectas")
    }        

})

const generarToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "7h",
        })
}

const dataUser = (req, res) => {
  res.status(200).json(req.user)
}

module.exports = {
  registrarUser,
  loginUser,
  dataUser,
}
