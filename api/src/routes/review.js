const { ACCESS_TOKEN_SECRET } = process.env;
const server = require("express").Router();
const { Review, User } = require("../db.js");
const jwt = require ("jsonwebtoken");
const authenticateToken = require('../auth/authenticateToken')

//Ruta para traer todas las reviews

server.get("/", (req, res, next) => {
    Review.findAll({
      include: {
        attributes: ["name", "lastname"],
        model: User,
      }
    })
      .then((reviews) => {
        res.status(200).json(reviews);
      })
      .catch((err) => next(err));
});

//Ruta para traer las reviews de un producto particular

server.get("/:productId", (req, res, next) => {
  let { productId } = req.params;
  Review.findAll({
    where: {
      productId: productId,
    },
  })
    .then((reviews) => {
      if (!reviews) {
        return res
          .status(400)
          .json({ message: "No se encontraron reviews para este producto" });
      } else {
        return res.status(200).json(reviews);
      }
    })
    .catch(next);
});

// Ruta para borrar una review de un producto

server.delete("/:reviewid", authenticateToken, (req, res, next) => {
  if (req.user.user.role === 'admin'){
    var reviewId = req.params.reviewid;
    Review.findOne({
      where: {
        id: reviewId,
      },
    }).then((review) => {
      if (!review) {
        return res
          .status(400)
          .json({ message: "No se encontro una review con ese ID" });
      }
      review.active = false;
      review.save();
      return res.json({ message: "REVIEW DELETE" });
    });
  } else {
    return res.status(403).json({message: "Usted no es un aministrador"})
  }
});

//Ruta para crear Review
server.post("/:productId/", authenticateToken, (req, res, next) => {
  const productId = req.params.productId;
  const userId = req.user.user.id;
  const { title, value, description } = req.body;
  if (!title || !value || !description)
    return res.status(400).json({ message: "Falta uno o mas datos." });
  Review.create({
    title,
    value,
    description,
    productId,
    userId,
  })
    .then((review) => res.status(200).json(review))
    .catch((err) => res.send(err));
});

//Ruta para modificar el Review de un producto
server.put("/:reviewId", authenticateToken, (req, res) => {
  if (req.user.user.role === 'admin'){
    const reviewId = req.params.reviewId;
    const { title, value, description, active } = req.body;

    Review.findOne({
      where: {
        id: reviewId,
      },
    }).then((review) => {
      if (!review)
        return res.status(404).json({ message: "No se encontro review" });
      else {
        review.title = title;
        review.value = value;
        review.description = description;
        review.active = active;
      }
      review
        .save()
        .then((newReview) => {
          res.status(200).json(newReview);
        })
        .catch((err) => res.json(err));
    });
  } else {
    return res.status(403).json({message: "Usted no es un aministrador"})
  }
});

module.exports = server;