'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Undangan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Undangan.belongsTo(models.Perangkat_Daerah, { foreignKey: 'kode_opd' });
      Undangan.belongsTo(models.Pegawai, { foreignKey: 'nip_pegawai' });
      Undangan.belongsTo(models.Uuid, { foreignKey: 'uuid' });
    }
  }
  Undangan.init({
    uuid: DataTypes.STRING,
    nomor_surat: DataTypes.STRING,
    sifat: DataTypes.STRING,
    perihal: DataTypes.STRING,
    ditujukan: DataTypes.STRING,
    pendahuluan: DataTypes.STRING(10000),
    tanggal: DataTypes.JSON,
    waktu: DataTypes.STRING,
    tempat: DataTypes.STRING,
    acara: DataTypes.STRING,
    penutup: DataTypes.STRING(10000),
    status: DataTypes.STRING,
    hari: DataTypes.STRING,
    bulan: DataTypes.STRING,
    tahun: DataTypes.STRING,
    atasan: DataTypes.JSON,
    kode_opd: DataTypes.STRING,
    nip_pegawai: DataTypes.STRING,
    nip_atasan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Undangan',
  });
  return Undangan;
};