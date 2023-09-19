'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Unidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Unidad.belongsTo(models.Estado, {
        foreignKey: "idEstado",
        targetKey: "id"
      })
    }
  }
  Unidad.init({
    abreviatura: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    idEstado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Unidad',
  });
  return Unidad;
};