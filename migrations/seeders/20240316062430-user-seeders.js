'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [
      {
        name: 'Sean',
        address: 'Test',
        email: 'test@test.com',
        password: await bcrypt.hash('222333', 5),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sean2',
        address: 'Test2',
        email: 'test2@test.com',
        password: await bcrypt.hash('222333', 5),
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
