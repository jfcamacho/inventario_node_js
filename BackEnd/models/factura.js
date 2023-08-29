'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Factura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Factura.belongsTo(models.Proveedor, {
        foreignKey: "idProveedor",
        targetKey: "id"
      }),
      Factura.belongsTo(models.Pago, {
        foreignKey: "idPago",
        targetKey: "id"
      }),
      Factura.belongsTo(models.Usuario, {
        foreignKey: "idUsuario",
        targetKey: "id"
      }),
      Factura.belongsTo(models.Estado, {
        foreignKey: "idEstado",
        targetKey: "id"
      })
    }
  }
  Factura.init({
    num_factura: DataTypes.STRING,
    idProveedor: DataTypes.INTEGER,
    fecha_compra: DataTypes.DATE,
    costo_total: DataTypes.FLOAT,
    descuento: DataTypes.FLOAT,
    idPago: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER,
    idEstado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Factura',
  });
  return Factura;
};