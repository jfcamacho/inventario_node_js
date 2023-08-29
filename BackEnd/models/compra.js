'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Compra.belongsTo(models.Factura, {
        foreignKey: "idFactura",
        targetKey: "id"
      }),
      Compra.belongsTo(models.Usuario, {
        foreignKey: "idUsuario",
        targetKey: "id"
      }),
      Compra.belongsTo(models.Inventario, {
        foreignKey: "idInventario",
        targetKey: "id"
      }),
      Compra.belongsTo(models.Estado, {
        foreignKey: "idEstado",
        targetKey: "id"
      })
    }
  }
  Compra.init({
    idFactura: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER,
    idInventario: DataTypes.INTEGER,
    ct_total: DataTypes.INTEGER,
    costo: DataTypes.FLOAT,
    idEstado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Compra',
  });
  return Compra;
};