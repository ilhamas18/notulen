'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File_Pendukung extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      File_Pendukung.belongsTo(models.Notulen, { foreignKey: 'id_notulen' });
    }
  }
  File_Pendukung.init({
    title: DataTypes.STRING,
    nama_file: DataTypes.STRING,
    file_url: DataTypes.STRING,
    id_notulen: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'File_Pendukung',
  });
  return File_Pendukung;
};