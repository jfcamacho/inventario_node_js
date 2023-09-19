'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proveedor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Proveedor.belongsTo(models.Pago, {
        foreignKey: "idPago",
        targetKey: "id"
      }),
      Proveedor.belongsTo(models.Estado, {
        foreignKey: "idEstado",
        targetKey: "id"
      })
    }
  }
  Proveedor.init({
    razon_social: DataTypes.STRING,
    nom_contacto: DataTypes.STRING,
    tel_contacto: DataTypes.STRING,
    idDireccion: DataTypes.INTEGER,
    idPago: DataTypes.INTEGER,
    idEstado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Proveedor',
  });
  return Proveedor;
};