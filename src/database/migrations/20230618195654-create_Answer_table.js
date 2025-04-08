'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Respuesta', {
      id_encuesta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      id_pregunta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      id_cuestionario_ad: {
        type: Sequelize.INTEGER,
        primaryKey: false,
      },
      puntuacion: { type: Sequelize.INTEGER },
    });

    await queryInterface.addConstraint('Respuesta', {
      fields: ['id_encuesta'],
      type: 'foreign key',
      name: 'fk_respuesta_encuesta',
      references: {
        table: 'Encuesta',
        field: 'id_encuesta',
      },
    });

    await queryInterface.addConstraint('Respuesta', {
      fields: ['id_pregunta'],
      type: 'foreign key',
      name: 'fk_respuesta_pregunta',
      references: {
        table: 'Pregunta',
        field: 'id_pregunta',
      },
    });

    await queryInterface.addConstraint('Respuesta', {
      fields: ['id_cuestionario_ad'],
      type: 'foreign key',
      name: 'fk_respuesta_cuestionario_ad',
      references: {
        table: 'CuestionarioAlumnoDocente',
        field: 'id_cuestionario_ad',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('Respuesta', 'fk_respuesta_encuesta');
    await queryInterface.removeConstraint('Respuesta', 'fk_respuesta_pregunta');
    await queryInterface.removeConstraint(
      'Respuesta',
      'fk_respuesta_cuestionario_ad'
    );
    await queryInterface.dropTable('Respuesta');
  },
};
