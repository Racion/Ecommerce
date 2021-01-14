const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('product_order', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        product_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total_product_amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        
    })
}