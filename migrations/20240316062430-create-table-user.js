'use strict';

const { DataType } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        field: 'address',
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        field: 'email',
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        field: 'password',
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
    return queryInterface.dropTable('user');
  },
};
