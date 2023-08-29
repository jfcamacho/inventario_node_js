'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Venta.belongsTo(models.Factura, {
        foreignKey: "idFactura",
        targetKey: "id"
      }),
      Venta.belongsTo(models.Usuario, {
        foreignKey: "idUsuario",
        targetKey: "id"
      }),
      Venta.belongsTo(models.Inventario, {
        foreignKey: "idInventario",
        targetKey: "id"
      }),
      Venta.belongsTo(models.Estado, {
        foreignKey: "idEstado",
        targetKey: "id"
      })
    }
  }
  Venta.init({
    idFactura: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER,
    idInventario: DataTypes.INTEGER,
    ct_total: DataTypes.INTEGER,
    costo: DataTypes.FLOAT,
    idEstado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Venta',
  });
  return Venta;
};