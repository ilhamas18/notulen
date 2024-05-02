'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Peserta', 'penanggungjawab', {
          type: Sequelize.DataTypes.JSON,
        }, { transaction: t }),
        queryInterface.addColumn(
          'Peserta',
          'nip_penanggungjawab',
          {
            type: Sequelize.STRING,
            references: {
              model: 'Pegawais',
              key: 'nip',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          { transaction: t }
        ),
        queryInterface.addColumn('Notulens', 'penanggungjawab', {
          type: Sequelize.DataTypes.JSON,
        }, { transaction: t }),
        queryInterface.addColumn(
          'Notulens',
          'nip_penanggungjawab'
          ,
          {
            type: Sequelize.STRING,
            references: {
              model: 'Pegawais',
              key: 'nip',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          { transaction: t }
        )
      ])
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Peserta', 'penanggungjawab', { transaction: t }),
        queryInterface.removeColumn('Peserta', 'nip_penanggungjawab', { transaction: t }),
        queryInterface.removeColumn('Notulens', 'penanggungjawab', { transaction: t }),
        queryInterface.removeColumn('Notulens', 'nip_penanggungjawab', { transaction: t })
      ]);
    });
  }
};
