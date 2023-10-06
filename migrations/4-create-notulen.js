'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notulens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tagging: {
        type: Sequelize.JSON
      },
      tanggal: {
        type: Sequelize.JSON
      },
      waktu: {
        type: Sequelize.STRING
      },
      pendahuluan: {
        type: Sequelize.STRING(1234)
      },
      pimpinan_rapat: {
        type: Sequelize.STRING
      },
      peserta_rapat: {
        type: Sequelize.JSON,
      },
      isi_rapat: {
        type: Sequelize.STRING(10000)
      },
      tindak_lanjut: {
        type: Sequelize.STRING(10000)
      },
      lokasi: {
        type: Sequelize.STRING
      },
      acara: {
        type: Sequelize.STRING
      },
      pelapor: {
        type: Sequelize.JSON
      },
      atasan: {
        type: Sequelize.JSON
      },
      status: {
        type: Sequelize.STRING
      },
      id_pegawai: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Harap masukkan pegawai terkait!'
          }
        },
        references: {
          model: 'Pegawais',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notulens');
  }
};