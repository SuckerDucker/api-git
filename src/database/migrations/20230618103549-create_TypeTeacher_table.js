'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tipo_docente', {
      id_tipo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      clave_tipo: { type: Sequelize.STRING(10) },
      descripcion: { type: Sequelize.STRING(50) },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tipo_docente');
  },
};
