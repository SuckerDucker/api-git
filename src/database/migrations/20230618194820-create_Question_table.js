'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pregunta', {
      id_pregunta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_cuestionario_ad: { type: Sequelize.INTEGER },
      pregunta: { type: Sequelize.TEXT },
    });

    await queryInterface.addConstraint('Pregunta', {
      fields: ['id_cuestionario_ad'],
      type: 'foreign key',
      name: 'fk_pregunta_cuestionario_ad',
      references: {
        table: 'CuestionarioAlumnoDocente',
        field: 'id_cuestionario_ad',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'Pregunta',
      'fk_pregunta_cuestionario_ad'
    );
    await queryInterface.dropTable('Pregunta');
  },
};
