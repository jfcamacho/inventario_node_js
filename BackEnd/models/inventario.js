'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inventario.belongsTo(models.Estado, {
        foreignKey: 'idEstado',
        targetKey: 'id'
      }),
      Inventario.belongsTo(models.Unidad, {
        foreignKey: 'idUnidad',
        targetKey: 'id'
      }),
      Inventario.belongsTo(models.Categoria, {
        foreignKey: 'idCategoria',
        targetKey: 'id'
      })
    }
  }
  Inventario.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    dir_almacenamiento: DataTypes.STRING,
    pr_compra: DataTypes.FLOAT,
    pr_venta: DataTypes.FLOAT,
    nv_min: DataTypes.INTEGER,
    nv_max: DataTypes.INTEGER,
    idUnidad: DataTypes.INTEGER,
    idCategoria: DataTypes.INTEGER,
    idEstado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inventario',
  });
  return Inventario;
};