'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tagging_Notulen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tagging_Notulen.init({
    id_notulen: DataTypes.INTEGER,
    id_tagging: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tagging_Notulen',
  });
  return Tagging_Notulen;
};