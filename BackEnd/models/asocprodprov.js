'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AsocProdProv extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AsocProdProv.belongsTo(models.Inventario, {
        foreignKey: "idProducto",
        targetKey: "id"
      }),
      AsocProdProv.belongsTo(models.Proveedor, {
        foreignKey: "idProveedor",
        targetKey: "id"
      })
    }
  }
  AsocProdProv.init({
    idProducto: DataTypes.INTEGER,
    idProveedor: DataTypes.INTEGER,
    idEstado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AsocProdProv',
  });
  return AsocProdProv;
};