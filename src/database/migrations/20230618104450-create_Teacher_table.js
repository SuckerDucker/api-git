'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Docente', {
      id_docente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: { type: Sequelize.STRING(60) },
      apellido_paterno: { type: Sequelize.STRING(50) },
      apellido_materno: { type: Sequelize.STRING(50) },
      correo: { type: Sequelize.STRING(120) },
      id_tipo: { type: Sequelize.INTEGER },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Docente');
  },
};
