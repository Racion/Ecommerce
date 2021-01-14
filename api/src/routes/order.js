const server = require("express").Router();
const { Order, Product, Product_order } = require("../db.js");
const authenticateToken = require("../auth/authenticateToken");

// Ruta para crear una orden al agregar el primer item al carrito

server.post("/", authenticateToken, (req, res, next) => {
  const userId = req.user.user.id;
  const { cartItems, orderId } = req.body;
  let total = 0;
  if (cartItems) {
    total = cartItems.reduce((acc, count) => {
      return acc + count.count * count.price;
    }, 0);
  }
  if (!userId)
    return res
      .status(400)
      .json({ message: "No se puede crear una orden sin usuario" });
  if (!orderId) {
    Order.create({
      total_price: total,
      userId: userId,
    })
      .then((order) => {
        if (cartItems) {
          cartItems.map((item) => {
            const currentItem = {
              product_quantity: item.count,
              total_product_amount: item.count * item.price,
              product_id: item.id,
              order_id: order.id,
            };
            Product_order.create(currentItem);
          });
        }
        res.json(order);
      })
      .catch(next);
  } else {
    if (cartItems) {
      cartItems.map((item) => {
        const currentItem = {
          product_quantity: item.count,
          total_product_amount: item.count * item.price,
          product_id: item.id,
          order_id: orderId,
        };
        Product_order.findOne({
          where: { order_id: orderId, product_id: item.id },
        }).then((pOrder) => {
          if (pOrder === null) {
            Product_order.create(currentItem);
          } else {
            const refreshItem = {
              product_quantity: pOrder.product_quantity + item.count,
              total_product_amount:
                pOrder.total_product_amount + item.count * item.price,
              product_id: item.id,
              order_id: orderId,
            };
            pOrder.update(refreshItem, {
              where: { order_id: orderId, product_id: item.id },
            });
          }
        });
      });
      Order.findOne({ where: { id: orderId } })
        .then((order) => {
          const total2 = { total_price: order.total_price + total };
          order.update(total2, { where: { id: orderId } }).then((order) => {
            res.json(order);
          });
        })
        .catch((err) => console.log("Err ==> ", err));
    }
  }
});
//Ruta para crear una orden para usuario logueado

// server.post("/", authenticateToken, (req, res) => {
//   const userId = req.user.user._id;
//   if (!userId)
//     return res
//       .send(400)
//       .json({ message: "No se puede crear una orden sin un usuerio logueado" });
//   Order.create({ userId })
//     .then((order) => res.json(order))
//     .catch((err) => res.json(err));
// });

//Ruta para agregar producto a una orden existente
server.post("/:orderId", authenticateToken, (req, res) => {
  console.log("Esto recibes ==>", req.body);
  const orderId = req.params.orderId;
  if (!orderId) return res.send("No puede agregar producto sin una orden");
  const { id, price } = req.body;
  const prodQuantity = !req.body.count ? 1 : req.body.count;
  const currentItem = {
    product_quantity: prodQuantity,
    total_product_amount: price,
    product_id: id,
    order_id: orderId,
  };
  Product_order.findOne({ where: { order_id: orderId, product_id: id } })
    .then((pOrder) => {
      if (pOrder === null) {
        Product_order.create(currentItem);
      } else {
        const refreshItem = {
          product_quantity: pOrder.product_quantity + prodQuantity,
          total_product_amount:
            pOrder.total_product_amount + prodQuantity * price,
          product_id: id,
          order_id: orderId,
        };
        pOrder.update(refreshItem, {
          where: { order_id: orderId, product_id: id },
        });
      }
    })
    .then(() => {
      Product_order.findOne({
        where: { order_id: orderId, product_id: id },
      }).then((pOrder) => res.json(pOrder));
    });
});
// Ruta que retorne todas las ordenes o segun un state

server.get("/", authenticateToken, (req, res, next) => {
  const state = req.query.state;
  if (state) {
    Order.findAll({
      attributes: ["id", "state", "total_price", "createdAt", "userId"],
      include: {
        attributes: ["title", "price", "img", "id"],
        model: Product,
        through: {
          attributes: ["id", "product_quantity", "total_product_amount"],
        },
      },
      where: { state },
    })
      .then((orders) => {
        if (!orders[0]) {
          res
            .status(400)
            .json({ message: "No se encuentran ordenes en ese estado" });
        } else {
          res.status(200).json(orders);
        }
      })
      .catch(next);
  } else {
    Order.findAll({
      attributes: ["id", "state", "total_price", "createdAt", "userId"],
      include: {
        attributes: ["title", "price", "img", "id"],
        model: Product,
        through: {
          attributes: ["id", "product_quantity", "total_product_amount"],
        },
      },
    })
      .then((orders) => {
        if (!orders) {
          res.status(400).json({ message: "No se encuentran ordenes" });
        } else {
          res.status(200).json(orders);
        }
      })
      .catch(next);
  }
});

// Ruta que retorna una orden en particular

server.get("/:id", authenticateToken, (req, res, next) => {
  const { id } = req.params;
  Order.findAll({
    attributes: ["id", "state", "total_price", "createdAt", "userId"],
    include: {
      attributes: ["title", "price", "img", "id"],
      model: Product,
      through: {
        attributes: [
          "id",
          "product_quantity",
          "total_product_amount",
          "order_id",
        ],
      },
    },
    where: { id },
  })
    .then((order) => {
      if (!order[0]) {
        return res.status(400).json({ message: "La orden no existe" });
      }
      res.status(200).json(order);
    })
    .catch((error) => next(error.message));
});

//Ruta para eliminar una orden

server.delete("/:id", authenticateToken, (req, res, next) => {
  let { id } = req.params;

  Order.findOne({ where: { id } })
    .then((order) => {
      if (!order) {
        return res
          .status(404)
          .json({ message: "Esa orden no existe o ya fue eliminada" });
      }
      Product_order.destroy({ where: { orderId: id } });
      Order.destroy({ where: { id } }).then(() => {
        return res.status(200).json({ message: "Order eliminada" });
      });
    })
    .catch(next);
});

//Ruta para eliminar un producto de la orden

server.put("/:orderId/:productId", authenticateToken, (req, res, next) => {
  let { orderId, productId } = req.params;
  let { total_product_amount } = req.body.product_order;
  console.log("body", total_product_amount);
  Product_order.destroy({
    where: {
      product_id: productId,
    },
  })
    .then(() => {
      Order.findOne({ where: { id: orderId } }).then((order) => {
        let total = { total_price: order.total_price - total_product_amount };
        Order.update(total, { where: { id: orderId } });
        res.json({ message: "Producto eliminado de la orden" });
      });
    })
    .catch((error) => next(error.message));
});

//Ruta para modificar una orden

server.put("/:id", authenticateToken, (req, res, next) => {
  let { id } = req.params;
  let action = req.body.action;
  const currentOrder =
    action === "addOne"
      ? {
          product_quantity: req.body.product_order.product_quantity + 1,
          total_product_amount:
            req.body.product_order.product_quantity * req.body.price,
          product_id: req.body.id,
          order_id: id,
        }
      : {
          product_quantity: req.body.product_order.product_quantity - 1,
          total_product_amount:
            req.body.product_order.product_quantity * req.body.price,
          product_id: req.body.id,
          order_id: id,
        };
  const total = {
    total_price: req.body.total_price,
  };

  Order.findOne({
    where: { id },
  })
    .then((order) => {
      if (action === "addOne") {
        Order.update(
          {
            total_price: order.total_price + req.body.price,
          },
          { where: { id } }
        );
      } else {
        Order.update(
          {
            total_price: order.total_price - req.body.price,
          },
          { where: { id } }
        );
      }

      if (!order) {
        return res.status(404).json({ message: "Esa orden no existe" });
      }
      Product_order.findOne({
        where: {
          product_id: currentOrder.product_id,
        },
      }).then((product) => {
        if (product) {
          Product_order.update(currentOrder, {
            where: { product_id: currentOrder.product_id },
          });
        } else {
          Product_order.create(currentOrder);
        }
        Order.update(total);
      });
    })
    .then(() => {
      Order.findOne({
        where: { id },
        include: {
          attributes: ["title", "price", "img", "id"],
          model: Product,
          through: {
            attributes: ["id", "product_quantity", "total_product_amount"],
          },
        },
      }).then((order) => res.json(order));
    })
    .catch(next);
});
// Cambiar el estado de 1 orden
server.put("/stateChange/:orderId", authenticateToken, (req, res) => {
  const orderId = req.params.orderId;
  const userRole = req.user.user.role;
  const estado = req.body.value;
  if (userRole !== "admin")
    return res
      .status(403)
      .send("No tiene permitido cambiar el estado de una orden");
  Order.update({ state: estado }, { where: { id: orderId } })
    .then((order) =>
      res.json({ message: `La orden ${orderId} fue actualizada a ${state}` })
    )
    .catch((err) => res.json(err));
});

module.exports = server;
