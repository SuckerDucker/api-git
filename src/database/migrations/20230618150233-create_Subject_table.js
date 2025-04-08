'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Materia', {
      id_materia: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre_materia: { type: Sequelize.STRING },
      nombre_corto_materia: { type: Sequelize.STRING },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Materia');
  },
};
