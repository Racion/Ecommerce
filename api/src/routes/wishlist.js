const server = require("express").Router();
const { Wishlist, Product, Product_wishlist } = require("../db.js");
const authenticateToken = require('../auth/authenticateToken')

// Traer una wishlist especifica

server.get("/:id", authenticateToken, (req, res, next) => {
	const {id} = req.params;
	Wishlist.findAll({
		attributes:["id", "createdAt", "userId"],
		include: {
			attributes: ["title", "price", "img", "id"],
			model: Product,
			through: {
				attributes: ["id", "product_quantity", "total_product_amount"]
			}
		},
		where:{id}
	})
		.then(order => {
			if(!order[0]) {
				return res.status(400).json({message: "La orden no existe"})
			}
			res.status(200).json(order)
		})
		.catch(error => next(error.message))
})

// Agregar un producto a la wishlist





module.exports = server;