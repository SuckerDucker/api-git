'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CuestionarioAlumnoDocente', {
      id_cuestionario_ad: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descripcion: { type: Sequelize.STRING },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('CuestionarioAlumnoDocente');
  },
};
