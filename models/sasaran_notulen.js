'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sasaran_Notulen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Sasaran_Notulen.init({
    id_sasaran: DataTypes.STRING,
    id_notulen: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sasaran_Notulen',
  });
  return Sasaran_Notulen;
};