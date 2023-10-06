'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pegawais', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      nip: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      pangkat: {
        type: Sequelize.STRING
      },
      nama_pangkat: {
        type: Sequelize.STRING
      },
      jabatan: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      kode_opd: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Harap masukkan OPD terkait!'
          }
        },
        references: {
          model: 'Perangkat_Daerahs',
          key: 'kode_opd'
        },
        onUpdate: 'CASCADE', // Optional: Add cascading options as needed
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Pegawais');
  }
};