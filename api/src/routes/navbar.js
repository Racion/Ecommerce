const server = require("express").Router();
const { Product, Category } = require("../db");

server.get("/:name", (req, res) => {
  const { name } = req.params;
  const name2 = name.toLowerCase();
  if (!name) {
    res.status(404);
    res.json({ error: "Campo Obligarotio" });
  }
  Product.findAll().then((products) => {
    let result = products.filter((product) => product.title.toLowerCase().includes(name2) || product.description.toLowerCase().includes(name2));
    return res.json(result);
  });
});

server.get("/categorie/:id", (req,res,next) => {
  let { id } = req.params;
  Product.findAll({
    include: {
      model: Category,
      where: {id},
    },
  }).then((products) => {
    if (!products)
      return res
        .status(404)
        .json({ message: "El producto con el id no existe." });
    return res.status(200).json({ products });
  });
})

module.exports = server;