'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Undangans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomor_surat: {
        type: Sequelize.STRING
      },
      sifat: {
        type: Sequelize.STRING
      },
      perihal: {
        type: Sequelize.STRING
      },
      ditujukan: {
        type: Sequelize.STRING
      },
      pendahuluan: {
        type: Sequelize.STRING(10000)
      },
      tanggal: {
        type: Sequelize.JSON
      },
      waktu: {
        type: Sequelize.STRING
      },
      tempat: {
        type: Sequelize.STRING
      },
      acara: {
        type: Sequelize.STRING
      },
      penutup: {
        type: Sequelize.STRING(10000)
      },
      status: {
        type: Sequelize.STRING,
      },
      hari: {
        type: Sequelize.STRING
      },
      bulan: {
        type: Sequelize.STRING
      },
      tahun: {
        type: Sequelize.STRING
      },
      atasan: {
        type: Sequelize.JSON,
      },
      kode_opd: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Harap masukkan OPD terkait!",
          },
        },
        references: {
          model: "Perangkat_Daerahs",
          key: "kode_opd",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      nip_pegawai: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Harap masukkan pegawai terkait!",
          },
        },
        references: {
          model: "Pegawais",
          key: "nip",
        },
      },
      nip_atasan: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Harap masukkan pegawai terkait!",
          },
        },
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
    await queryInterface.dropTable('Undangans');
  }
};