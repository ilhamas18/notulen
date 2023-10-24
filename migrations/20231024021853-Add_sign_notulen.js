'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Notulens',
        'signature',
        {
          type: Sequelize.STRING,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          defaultValue: null, after: 'can_maintain_system'
        },
      ),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Notulens', 'signature'),
    ]);
  }
};
