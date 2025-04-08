'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Grupo', {
      id_grupo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      clave_grupo: { type: Sequelize.STRING },
      id_carrera: { type: Sequelize.INTEGER },
    });

    await queryInterface.addConstraint('Grupo', {
      fields: ['id_carrera'],
      type: 'foreign key',
      name: 'fk_grupo_carrera',
      references: {
        table: 'Carrera',
        field: 'id_carrera',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('Grupo', 'fk_grupo_carrera');
    await queryInterface.dropTable('Grupo');
  },
};
