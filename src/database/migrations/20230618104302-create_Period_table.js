'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Periodo', {
      id_periodo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      Estado: { type: Sequelize.INTEGER },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Periodo');
  },
};
