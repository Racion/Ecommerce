const server = require("express").Router();
const { Product, Category } = require("../db.js");
const authenticateToken = require('../auth/authenticateToken')

// Ruta que devuelve todos los productos activos

server.get("/", (req, res, next) => {
  Product.findAll({
    include: {
      model: Category,
      through: {
        attributes: [],
      },
    },
  })
    .then((products) => {
      if (!products) {
        return res
          .status(400)
          .json({ message: "No se encontraron productos." });
      }
      res.status(200).json(products);
    })
    .catch(next);
});

server.get("/:id", (req, res, next) => {
  let { id } = req.params;
  console.log(id);

  Product.findOne({
    where: { id },
    include: {
      model: Category,
      through: {
        attributes: [],
      },
    },
  }).then((products) => {
    if (!products)
      return res
        .status(404)
        .json({ message: "El producto con el id no existe." });
    return res.status(200).json(products);
  });
});

// Ruta que devuelve solo productos de x categoria

server.get("/category/:id", (req, res, next) => {
  Product.findAll({
    include: {
      model: Category,
      where: {
        id: req.params.id,
      },
    },
    where: {
      active: true,
    },
  })
    .then((products) => {
      if (!products[0]) {
        return res
          .status(400)
          .json({ message: "No se encontraron productos." });
      }
      res.status(200).json(products);
    })
    .catch(next);
});

// Ruta para cargar productos

server.post("/", authenticateToken, async (req, res, next) => {
  if (req.user.user.role === 'admin'){
    let { title, stock, description, price, img, category } = req.body;
    if (!title || !stock || !description || !price || !img || !category)
      return res.status(400).json({ message: "Faltan uno o mas parametros." });
    try {
      const product = await Product.create({
        title,
        stock,
        description,
        price,
        img,
      });
      await product.setCategories(category);
      const newProduct = await Product.findOne({
        where: { id: product.id },
        include: {
          model: Category,
          through: { attributes: [] },
        },
      });
      return res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(403).json({message: "Usted no es un aministrador"})
  }
});

// Ruta para cargar categoria a un producto

server.post("/:idProducto/category/:idCategoria", authenticateToken, (req, res, next) => {
  if (req.user.user.role === 'admin'){
    let { idProducto, idCategoria } = req.params;
    Product.findOne({
      where: {
        id: idProducto,
      },
    })
    .then((product) => {
      if (!product) {
        return res
          .status(400)
          .json({ message: "No se encontraron productos con ese id." });
      }
      product.addCategories(idCategoria);
      res.status(201).json({ message: "Categoria agregada" });
    })
    .catch((err) => err);
  } else {
    return res.status(403).json({message: "Usted no es un aministrador"})
  }
});

// Ruta para remover categoria a un producto

server.delete("/:idProducto/category/:idCategoria", authenticateToken, (req, res, next) => {
  if (req.user.user.role === 'admin'){
    let { idProducto, idCategoria } = req.params;
    Product.findOne({
      where: {
        id: idProducto,
      },
    })
      .then((product) => {
        if (!product) {
          return res
            .status(400)
            .json({ message: "No se encontraron productos con ese id." });
        }
        product.removeCategories(idCategoria);
        res.status(201).json({ message: "Categoria borrada" });
      })
      .catch((err) => err);
  } else {
    return res.status(403).json({message: "Usted no es un aministrador"})
  }
});

// Ruta para modificar producto

server.put("/:id", authenticateToken, (req, res, next) => {
  if (req.user.user.role === 'admin'){
    let { id } = req.params;
    let productData = req.body;
    // No compruebo id porque se trae de un producto listado existente
    Product.update(productData, { where: { id } })
      .then((response) => {
        Product.findOne({
          where: { id },
          include: {
            model: Category,
            through: { attributes: [] },
          },
        }).then((product) => {
          return res.status(200).json(product);
        });
      })
      .catch(next);
  } else {
    return res.status(403).json({message: "Usted no es un aministrador"})
  }
});

// Ruta para "eliminar" productos

server.delete("/:id", authenticateToken, (req, res) => {
  if (req.user.user.role === 'admin'){
    Product.findByPk(req.params.id).then((product) => {
      if (product === null) {
        res.json({ message: "El id especificado no existe o contiene errores." });
      } else {
        product.active = false;
        product.save();
        return res.json({ message: "PRODUCT DELETE" });
      }
    });
  } else {
    return res.status(403).json({message: "Usted no es un aministrador"})
  }
});


module.exports = server;