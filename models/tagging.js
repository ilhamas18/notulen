'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tagging extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Tagging.init({
    nama_tagging: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tagging',
  });
  return Tagging;
};