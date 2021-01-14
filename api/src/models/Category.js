
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('category', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
    	type: DataTypes.BOOLEAN,
    	defaultValue: true
    }
  });
}

