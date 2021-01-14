require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const crypto = require('crypto');

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Product,
  Category,
  Order,
  User,
  Product_order,
  Review,
  Wishlist,
  Product_wishlist
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Product.belongsToMany(Category, {
  through: "product_category",
  foreignKey: "product_id",
});
Category.belongsToMany(Product, {
  through: "product_category",
  foreignKey: "category_id",
});

Product.belongsToMany(Order, {
  through: Product_order,
  foreignKey: "product_id",
});

Order.belongsToMany(Product, {
  through: Product_order,
  foreignKey: "order_id",
});

Order.belongsTo(User);
User.hasMany(Order);

Review.belongsTo(Product);
Product.hasMany(Review);

User.hasMany(Review);
Review.belongsTo(User);

Product.belongsToMany(Wishlist, {
  through: Product_wishlist,
  foreignKey: "product_id"
})

Wishlist.belongsToMany(Product, {
  through: Product_wishlist,
  foreignKey: "product_id"
})

Wishlist.belongsTo(User);
User.hasOne(Wishlist);

// FUNCIONES PARA ENCRIPTADO DE CONTRASEÑA
User.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex')
}

const setSaltAndPassword = user => {
    if (user.changed('password')) {
        user.salt = User.generateSalt()
        user.password = User.encryptPassword(user.password(), user.salt())
    }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)


// FUNCION PARA VERIFICAR MAS ADELANTE QUE LO QUE LE PASAN ES LA GUARDADA
User.prototype.correctPassword = function(enteredPassword) {
    return User.encryptPassword(enteredPassword, this.salt()) === this.password()
}


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
