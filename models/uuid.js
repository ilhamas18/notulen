'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Uuid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Uuid.hasOne(models.Undangan, { foreignKey: 'uuid' });
      Uuid.hasOne(models.Notulen, { foreignKey: 'uuid' });
      Uuid.belongsTo(models.Perangkat_Daerah, { foreignKey: 'kode_opd' });
      Uuid.belongsTo(models.Pegawai, { foreignKey: 'nip_pegawai' });
    }
  }
  Uuid.init({
    uuid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
  }, {
    sequelize,
    modelName: 'Uuid',
  });
  return Uuid;
};