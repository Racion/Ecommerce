const server = require("express").Router();
const { User, Order, Product } = require("../db");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../auth/authenticateToken");

require("../auth/passportConfig.js");

server.use(passport.initialize()); //Arranca passport mediante middleware
server.use(passport.session());

//Ruta pare crear usuario

server.post("/signup", (req, res, next) => {
  const { name, lastname, email, password } = req.body;
  if (!name || !lastname || !email || !password) {
    return res
      .status(400)
      .json({ message: "Parametros incompletos o invalidos" });
  }
  User.create({
    name: name,
    lastname: lastname,
    email: email,
    password: password,
  })
    .then((user) => res.status(200).json(user))
    .catch(next);
});

//Ruta para loguearse

server.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) return next(err);
      if (!user) return res.json(info);
      req.logIn(user, async (err) => {
        if (err) {
          return next(err);
        }
        const body = {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          role: user.idAdmin,
        };
        const accessToken = jwt.sign(
          { user: body },
          process.env.ACCESS_TOKEN_SECRET
        );
        res.cookie("authcookie", accessToken, {
          maxAge: 720000,
          httpOnly: true,
        });
        return res.json(body);
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// Loguearse con Google

server.get(
  "/google",
  passport.authenticate("google-login", { scope: ["profile", "email"] })
);

server.get("/google/callback", async (req, res, next) => {
  passport.authenticate(
    "google-login",
    { failureRedirect: "http://localhost:3000/user/login" },
    async (err, user, info) => {
      try {
        if (err) return next(err);
        req.logIn(user, async (err) => {
          if (err) return next(err);
          const body = {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.idAdmin,
          };
          const accessToken = jwt.sign(
            { user: body },
            process.env.ACCESS_TOKEN_SECRET
          );
          res.cookie("authcookie", accessToken, {
            maxAge: 720000,
            httpOnly: true,
          });
          return res.redirect("http://localhost:3000");
          // res.redirect('http://localhost:3000')
        });
      } catch (error) {}
    }
  )(req, res, next);
});

//Ruta para desloguearse

server.get("/logout", (req, res) => {
  res.clearCookie("authcookie");
  req.logout();
  res.json({ message: "Has cerrado sesion" });
});

//Ruta para obtener el perfil basandose en la autenticacion del token

server.get("/profile", authenticateToken, (req, res) => {
  res.send(req.user);
});

//Ruta para modificar usuario

server.put("/:id", authenticateToken, (req, res, next) => {
  let id = req.params.id;
  let data = req.body;
  User.update(data, { where: { id } }).then((response) => {
    User.findOne({ where: { id } }).then((user) => {
      return res.status(200).json(user);
    });
  });
});

// Ruta para modificar contraseña
server.put("/reset/password", (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      user.password = password;
      user.save();
      res.json(user);
    })
    .catch(() => res.json({ error: "El usuario no esta registrado" }));
});

//Ruta para eliminar usuario

server.delete("/:id", authenticateToken, (req, res, next) => {
  if (req.user.user.role === "admin") {
    let id = req.params.id;
    User.findByPk(id).then((user) => {
      if (!user) {
        res.json({ message: "El ID no corresponde a un usuario valido" });
      } else {
        user.active = false;
        user.save();
        return res.json({ message: "USER DELETE" });
      }
    });
  } else {
    return res.status(403).json({ message: "Usted no es un aministrador" });
  }
});

//Ruta que retorne todos los usuarios activos

server.get("/", authenticateToken, (req, res, next) => {
  if (req.user.user.role === "admin") {
    User.findAll({
      where: {
        active: true,
      },
    })
      .then((users) => {
        if (!users) {
          return res
            .status(400)
            .json({ message: "No se encontraron usuarios" });
        }
        res.status(200).json(users);
      })
      .catch(next);
  } else {
    return res.status(403).json({ message: "Usted no es un aministrador" });
  }
});

//Ruta que retorne todas las ordenes de un usuario

server.get("/orders", authenticateToken, (req, res, next) => {
  const userId = req.user.user.id;
  Order.findAll({
    attributes: ["id", "state", "total_price", "createdAt", "userId"],
    include: {
      attributes: ["title", "price", "img", "id"],
      model: Product,
      through: {
        attributes: ["id", "product_quantity", "total_product_amount"],
      },
    },
    where: { userId },
  })
    .then((orders) => {
      if (orders !== null) {
        res.status(200).json(orders);
      } else {
        res
          .status(400)
          .json({ message: "El usuario no tiene ordenes o no existe." });
      }
    })
    .catch(next);
});

//Ruta para convertir usuario en Administrador
server.put("/promote/:userId", authenticateToken, (req, res) => {
  if (req.user.user.role === "admin") {
    const userId = req.params.userId;
    User.findOne({ where: { id: userId } })
      .then((user) => {
        console.log(user);
        if (!user)
          return res.status(404).json({ message: "Usuario no encontrado." });
        else if (user.idAdmin === "admin") {
          return res.status(400).json({
            message: `El usuario ${user.name} ${user.lastname} ya esta asignado como Admin.`,
          });
        } else user.idAdmin = "admin";
        user.save().then((newAdmin) => res.status(200).json(newAdmin));
      })
      .catch((err) => res.json(err));
  } else {
    return res.status(403).json({ message: "Usted no es un aministrador" });
  }
});

module.exports = server;
