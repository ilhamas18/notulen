'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Undangans',
        'uuid',
        {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              args: true,
              msg: "Harap masukkan uuid!",
            },
          },
          references: {
            model: "Uuids",
            key: "uuid",
          },
        }
      ),
      queryInterface.addColumn(
        'Notulens',
        'uuid',
        {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              args: true,
              msg: "Harap masukkan uuid!",
            },
          },
          references: {
            model: "Uuids",
            key: "uuid",
          },
        }
      ),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Undangans', 'uuid'),
      queryInterface.removeColumn('Notulens', 'uuid')
    ]);
  }
};
