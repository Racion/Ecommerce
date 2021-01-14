const server = require("express").Router();
const { Category } = require("../db");
const authenticateToken = require('../auth/authenticateToken')

// Consulta para obtener TODOS los registros de la base de datos
server.get("/", (req, res, next) => {
  Category.findAll()
    .then((category) => {
      if (!category.length) {
        return res
          .status(404)
          .json({ message: "No se encontraron categorias." });
      }
      return res.status(200).json(category);
    })
    .catch(next);
});

server.post("/", authenticateToken, (req, res, next) => {
  if (req.user.user.role === 'admin'){
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Faltan parametros" });
    }
    Category.create({ title: title })
      .then((category) => res.status(200).json({ category }))
      .catch(next);
  } else {
    return res.status(403).json({message: "Usted no es un aministrador"})
  }
});

server.delete("/:id", authenticateToken,  (req, res) => {
  if (req.user.user.role === 'admin'){
    Category.findByPk(req.params.id).then((category) => {
      if (category === null) {
        res.json({ message: "El id especificado no existe o contiene errores." });
      } else {
        category.active = false;
        category.save();
        return res.json({ message: "CATEGORY DELETE" });
      }
    });
  } else {
    return res.status(403).json({message: "Usted no es un aministrador"})
  }
});

// Ruta para modificar una categoria

server.put("/:id", authenticateToken, (req, res, next) => {
  if (req.user.user.role === 'admin'){
    const { id } = req.params;
    const data = req.body;
    Category.update(data, { where: { id } })
    .then((response) => {
      Category.findOne({
        where: { id },
      }).then((category) => {
        return res.status(200).json(category);
      });
    })
    .catch(next);
  } else {
    return res.status(403).json({message: "Usted no es un aministrador"})
  }
});

module.exports = server;