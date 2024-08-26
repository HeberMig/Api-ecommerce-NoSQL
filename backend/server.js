const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 4000

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/orders', require('./routes/ordersRoutes'))//Pedidos
app.use('/api/products', require('./routes/productsRoutes'))//Productos
app.use('/api/users', require('./routes/usersRoutes'))//Usuario

app.use(errorHandler)

app.listen(port, () => console.log(`Servidor inciado en el puerto ${port}` .yellow));