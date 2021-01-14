const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
     name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, //Min 8 caracteres, 1 number, 1 uppercase
      },
      get() {
        return () => this.getDataValue('password')
      } 
    },
   
    idAdmin: {
      type: DataTypes.ENUM("admin", "client"),
      defaultValue: "client",
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    salt: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue("salt");
      },
    },
  });
};

