'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Taggings',
        'kode_opd',
        {
          type: Sequelize.STRING,
          references: {
            model: 'Perangkat_Daerahs',
            key: 'kode_opd',
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          defaultValue: null, after: 'can_maintain_system'
        },
      ),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Taggings', 'kode_opd'),
    ]);
  }
};
