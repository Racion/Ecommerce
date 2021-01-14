const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('product_wishlist', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        total_product_price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        
    })
}