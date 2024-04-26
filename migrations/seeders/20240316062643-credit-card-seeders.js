'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('debit_card', [
      {
        user_id: 1,
        type: 'Gold',
        number: '98322223423',
        name: 'Asep',
        expired: '01/25',
        cvv: '333',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 2,
        type: 'Platinum',
        number: '98322223421',
        name: 'Dudung',
        expired: '01/26',
        cvv: '444',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('debit', null, {});
  }
};
