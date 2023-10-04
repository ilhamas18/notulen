'use strict';

const data = [
  {
    nama: 'Dr. Ir. H. Ali Mochtar, Ph.D',
    nip: '19630407199803002',
    password: 'default',
    pangkat: 'Pembina Utama',
    jabatan: 'Eselon II',
    role: 1,
    id_opd: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nama: 'John Doe',
    nip: '19630407199803002',
    password: 'default',
    pangkat: 'Pembina',
    jabatan: 'Eselon III',
    role: 2,
    id_opd: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nama: 'Barack Obama',
    nip: '19630407199803002',
    password: 'default',
    pangkat: 'Pembina',
    jabatan: 'Eselon III',
    role: 3,
    id_opd: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nama: 'Ali Yoga Utama, S STP',
    nip: '19860516 200412 1002',
    password: 'default',
    pangkat: 'Penata Tingkat I',
    jabatan: 'Eselon IV',
    role: 3,
    id_opd: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nama: 'AGUS TRITJAHJANTO, S.Si.',
    nip: '19690913 199703 1 005',
    password: 'default',
    pangkat: 'Pembina Tingkat I',
    jabatan: 'Eselon IV',
    role: 3,
    id_opd: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pegawais', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pegawais', null, {});
  }
};
