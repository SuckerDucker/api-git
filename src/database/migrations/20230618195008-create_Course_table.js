'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Curso', {
      id_curso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_periodo: { type: Sequelize.INTEGER },
      id_materia: { type: Sequelize.INTEGER },
      id_grupo: { type: Sequelize.INTEGER },
      id_docente: { type: Sequelize.INTEGER },
    });

    await queryInterface.addConstraint('Curso', {
      fields: ['id_periodo'],
      type: 'foreign key',
      name: 'fk_curso_periodo',
      references: {
        table: 'Periodo',
        field: 'id_periodo',
      },
    });

    await queryInterface.addConstraint('Curso', {
      fields: ['id_materia'],
      type: 'foreign key',
      name: 'fk_curso_materia',
      references: {
        table: 'Materia',
        field: 'id_materia',
      },
    });

    await queryInterface.addConstraint('Curso', {
      fields: ['id_grupo'],
      type: 'foreign key',
      name: 'fk_curso_grupo',
      references: {
        table: 'Grupo',
        field: 'id_grupo',
      },
    });

    await queryInterface.addConstraint('Curso', {
      fields: ['id_docente'],
      type: 'foreign key',
      name: 'fk_curso_docente',
      references: {
        table: 'Docente',
        field: 'id_docente',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('Curso', 'fk_curso_periodo');
    await queryInterface.removeConstraint('Curso', 'fk_curso_materia');
    await queryInterface.removeConstraint('Curso', 'fk_curso_grupo');
    await queryInterface.removeConstraint('Curso', 'fk_curso_docente');
    await queryInterface.dropTable('Curso');
  },
};
