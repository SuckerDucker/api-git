'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Curso_comentario', {
      id_curso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      comentario: { type: Sequelize.TEXT },
    });

    await queryInterface.addConstraint('Curso_comentario', {
      fields: ['id_curso'],
      type: 'foreign key',
      name: 'fk_curso_comentario_curso',
      references: {
        table: 'Curso',
        field: 'id_curso',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'Curso_comentario',
      'fk_curso_comentario_curso'
    );
    await queryInterface.dropTable('Curso_comentario');
  },
};
