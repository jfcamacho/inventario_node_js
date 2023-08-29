'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Direccion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Direccion.belongsTo(models.Estado, {
        foreignKey: "idEstado",
        targetKey: "id"
      }),
      Direccion.belongsTo(models.Usuario, {
        foreignKey: "idUsuario",
        targetKey: "id"
      })
    }
  }
  Direccion.init({
    idUsuario: DataTypes.INTEGER,
    direccion: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    pais: DataTypes.STRING,
    cod_postal: DataTypes.INTEGER,
    telefono: DataTypes.STRING,
    instrucciones: DataTypes.TEXT,
    idEstado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Direccion',
  });
  return Direccion;
};