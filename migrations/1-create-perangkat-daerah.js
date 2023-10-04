'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Perangkat_Daerahs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kode_opd: {
        type: Sequelize.STRING
      },
      nama_opd: {
        type: Sequelize.STRING
      },
      singkatan: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      telepon: {
        type: Sequelize.STRING
      },
      faximile: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Perangkat_Daerahs');
  }
};