'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Alumno', {
      matricula: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      apellido_paterno: { type: Sequelize.STRING },
      apellido_materno: { type: Sequelize.STRING },
      nombre: { type: Sequelize.STRING },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Alumno');
  },
};
