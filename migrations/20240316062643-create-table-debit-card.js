'use strict';

const { DataType } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('debit_card', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id',
        unique: true,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      type: {
        type: Sequelize.STRING,
        field: 'type',
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING,
        field: 'number',
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: false,
      },
      expired: {
        type: Sequelize.STRING,
        field: 'expired',
        allowNull: false,
      },
      cvv: {
        type: Sequelize.STRING,
        field: 'cvv',
        allowNull: false,
      },
      created_at: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('debit_card');
  },
};
