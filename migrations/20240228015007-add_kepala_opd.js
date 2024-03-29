'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Perangkat_Daerahs',
      'kepala_opd',
      Sequelize.JSON
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Perangkat_Daerahs',
      'kepala_opd'
    );
  }
};
