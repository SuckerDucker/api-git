'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Curso_has_Alumno', {
      id_curso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      matricula: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    });

    await queryInterface.addConstraint('Curso_has_Alumno', {
      fields: ['id_curso'],
      type: 'foreign key',
      name: 'fk_curso_has_alumno_curso',
      references: {
        table: 'Curso',
        field: 'id_curso',
      },
    });

    await queryInterface.addConstraint('Curso_has_Alumno', {
      fields: ['matricula'],
      type: 'foreign key',
      name: 'fk_curso_has_alumno_alumno',
      references: {
        table: 'Alumno',
        field: 'matricula',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'Curso_has_Alumno',
      'fk_curso_has_alumno_curso'
    );
    await queryInterface.removeConstraint(
      'Curso_has_Alumno',
      'fk_curso_has_alumno_alumno'
    );
    await queryInterface.dropTable('Curso_has_Alumno');
  },
};
