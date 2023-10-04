'use strict';

const data = [
  {
    kode_opd: '10.0.0.0.1',
    nama_opd: 'BADAN PERENCANAAN, PENELITIAN DAN PEMBANGUNAN DAERAH',
    singkatan: 'BAPPELITBANGDA',
    alamat: 'Jl  Mayjen Panjaitan  No. 17 Lt II, Kode Pos: 63137, Jawa Timur',
    telepon: '( 0351 ) 471535',
    faximile: '( 0351 ) 471535',
    website: 'http://www. madiunkota.go.id',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Perangkat_Daerahs', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Perangkat_Daerahs', null, {});
  }
};
