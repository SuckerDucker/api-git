'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Encuesta', {
      id_encuesta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_curso: { type: Sequelize.INTEGER },
      matricula_alumno: { type: Sequelize.INTEGER },
      id_cuestionario_ad: { type: Sequelize.INTEGER },
      estatus: { type: Sequelize.INTEGER },
    });

    await queryInterface.addConstraint('Encuesta', {
      fields: ['matricula_alumno'],
      type: 'foreign key',
      name: 'fk_encuesta_alumno',
      references: {
        table: 'Alumno',
        field: 'matricula',
      },
    });

    await queryInterface.addConstraint('Encuesta', {
      fields: ['id_cuestionario_ad'],
      type: 'foreign key',
      name: 'fk_encuesta_cuestionario_ad',
      references: {
        table: 'CuestionarioAlumnoDocente',
        field: 'id_cuestionario_ad',
      },
    });

    await queryInterface.addConstraint('Encuesta', {
      fields: ['id_curso'],
      type: 'foreign key',
      name: 'fk_encuesta_curso',
      references: {
        table: 'Curso',
        field: 'id_curso',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('Encuesta', 'fk_encuesta_curso');
    await queryInterface.removeConstraint('Encuesta', 'fk_encuesta_alumno');
    await queryInterface.removeConstraint(
      'Encuesta',
      'fk_encuesta_cuestionario_ad'
    );
    await queryInterface.dropTable('Encuesta');
  },
};
