'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('photo', [
      {
        user_id: 1,
        url: 'https://picsum.photos/200',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 1,
        url: 'https://picsum.photos/200',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 2,
        url: 'https://picsum.photos/200',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('photo', null, {});
  }
};
