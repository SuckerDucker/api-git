'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carrera', {
      id_carrera: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre_carrera: { type: Sequelize.STRING(60) },
      nombre_corto: { type: Sequelize.STRING(50) },
      correo_institucional: { type: Sequelize.STRING(120) },
      status: { type: Sequelize.TINYINT({ length: 1 }) },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Carrera');
  },
};
