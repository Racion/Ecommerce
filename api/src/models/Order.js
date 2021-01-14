const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    total_price: {
      type: DataTypes.FLOAT,
    },
    state: {
      type: DataTypes.ENUM(
        "cart",
        "create",
        "processing",
        "cancelled",
        "complete"
      ),
      defaultValue: "cart",
    },
  });
};
