"use strict";
const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Pegawais",
      [
        {
          nama: "admin",
          nip: "123456789012345678",
          password: hashPassword('enotulen_kota_madiun'),
          pangkat: "super_admin",
          nama_pangkat: "super_admin",
          jabatan: "super_admin",
          role: 1,
          kode_opd: "1234567890",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
