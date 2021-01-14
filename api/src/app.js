const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require('cors')
const { ACCESS_TOKEN_SECRET } = process.env;
const session = require("express-session");

require("./db.js");

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser(ACCESS_TOKEN_SECRET));
server.use(morgan("dev"));
server.use(cors({origin: 'http://localhost:3000', credentials: true}))

server.use("/", routes);

server.use(session({
	secret: ACCESS_TOKEN_SECRET,
	resave: true, //Volvemos a guardar
	saveUninitialized: true //Si no le guardamos nada igual se guarda
}));


// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;