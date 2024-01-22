'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Perangkat_Daerah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Perangkat_Daerah.hasMany(models.Pegawai, { foreignKey: 'kode_opd' });
      Perangkat_Daerah.hasMany(models.Undangan, { foreignKey: 'kode_opd' });
      Perangkat_Daerah.hasMany(models.Notulen, { foreignKey: 'kode_opd' });
      Perangkat_Daerah.hasMany(models.Tagging, { foreignKey: 'kode_opd' });
      Perangkat_Daerah.hasMany(models.Uuid, { foreignKey: 'kode_opd' });
    }
  }
  Perangkat_Daerah.init({
    kode_opd: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nama_opd: DataTypes.STRING,
    singkatan: DataTypes.STRING,
    alamat: DataTypes.STRING,
    telepon: DataTypes.STRING,
    faximile: DataTypes.STRING,
    website: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Perangkat_Daerah',
  });
  return Perangkat_Daerah;
};