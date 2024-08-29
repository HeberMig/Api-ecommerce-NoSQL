const asyncHandler = require("express-async-handler");
const Producto = require("../models/productsModel");

const getProducts = asyncHandler(async (req, res) => {
  //const { name, lastName, email, password} = req.body
  const productos = await Producto.find();
  res.status(200).json(productos);
});

const getSearchProducts = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("No se proporciono el id");
  }

  const producto = await Producto.findById(id);

  if (!producto) {
    res.status(404);
    throw new Error("Producto no encontrado");
  }
  res.status(200).json(producto);
});

const createProduct = asyncHandler(async (req, res) => {
  //destructuramos product
  const { user, name, description, price, image, category } = req.body;

  if (!user || !name || !description || !price || !image || !category) {
    res.status(400);
    throw new Error("Faltan campos");
  }

  const existeProducto = await Producto.findOne({ name });

  if (existeProducto) {
    res.status(400);
    throw new Error("Producto ya existe");
  }
  const producto = await Producto.create({
    user: req.user.id,//Autenticar al user
    name,
    description,
    price,
    image,
    category,
  });

  if (producto) {
    res.status(201).json({
      message: "Producto creado con exito",
      _id: producto.id,
      user: producto.user,
      name: producto.name,
      description: producto.description,
      price: producto.price,
      image: producto.image,
      category: producto.category,
    });
  } else {
    res.status(400);
    throw new Error("Error al crear producto");
  }
});

const updateProducts = asyncHandler(async (req, res) => {
  const producto = await Producto.findById(req.params.id);
  if (!producto) {
    res.status(404);
    throw new Error("Producto no encontrado");
  }

  if (producto.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("No tienes permiso para editar este producto");
  } else {
    const productoUpdate = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Producto Actualizado", productoUpdate });
  }
});


const deleteProducts = asyncHandler(async (req, res) => {
  const producto = await Producto.findById(req.params.id)
  if (!producto) {
    res.status(404)
    throw new Error("Producto no encontrado")
  }
  if (producto.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("No tienes permiso para eliminar este producto")
  } else {
    //await Producto.deleteOne();
    await Producto.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Producto Eliminado", id: req.params.id })
  }
});

module.exports = {
  getProducts,
  getSearchProducts,
  createProduct,
  updateProducts,
  deleteProducts,
};
