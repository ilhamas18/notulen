'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notulen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notulen.belongsTo(models.Perangkat_Daerah, { foreignKey: 'kode_opd' });
      Notulen.belongsTo(models.Pegawai, { foreignKey: 'nip_pegawai' });
      Notulen.belongsTo(models.Uuid, { foreignKey: 'uuid' });
      Notulen.hasMany(models.File_Pendukung, { foreignKey: 'id_notulen' });
      Notulen.belongsToMany(models.Sasaran, {
        through: models.Sasaran_Notulen,
        foreignKey: 'id_notulen',
        otherKey: 'id_sasaran'
      });
      Notulen.belongsToMany(models.Tagging, {
        through: models.Tagging_Notulen,
        foreignKey: 'id_notulen',
        otherKey: 'id_tagging'
      })
    }
  }
  Notulen.init({
    uuid: DataTypes.STRING,
    tanggal: DataTypes.JSON,
    waktu: DataTypes.STRING,
    pendahuluan: DataTypes.STRING(1234),
    pimpinan_rapat: DataTypes.STRING,
    peserta_rapat: DataTypes.JSON,
    isi_rapat: DataTypes.STRING(10000),
    tindak_lanjut: DataTypes.STRING(10000),
    lokasi: DataTypes.STRING,
    acara: DataTypes.STRING,
    atasan: DataTypes.JSON,
    status: DataTypes.STRING,
    hari: DataTypes.STRING,
    bulan: DataTypes.STRING,
    tahun: DataTypes.STRING,
    link_img_foto: DataTypes.JSON,
    link_img_daftar_hadir: DataTypes.JSON,
    link_img_surat_undangan: DataTypes.JSON,
    link_img_spj: DataTypes.JSON,
    link_img_pendukung: DataTypes.JSON,
    signature: DataTypes.STRING(10000),
    signature_atasan: DataTypes.STRING(10000),
    keterangan: DataTypes.STRING,
    kode_opd: DataTypes.STRING,
    nip_pegawai: DataTypes.STRING,
    nip_atasan: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Notulen',
  });
  return Notulen;
};