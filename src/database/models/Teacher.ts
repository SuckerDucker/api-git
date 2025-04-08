import { Model, DataTypes } from 'sequelize';
import sequelize from '../index';

import { Course } from './Course';
import { TypeTeacher } from './TypeTeacher';

class Teacher extends Model {
  id_docente!: number;
  nombre!: string;
  apellido_paterno!: string;
  apellido_materno!: string;
  correo!: string;
  id_tipo!: number;
}

Teacher.init(
  {
    id_docente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: DataTypes.STRING(60) },
    apellido_paterno: { type: DataTypes.STRING(50) },
    apellido_materno: { type: DataTypes.STRING(50) },
    correo: { type: DataTypes.STRING(120) },
    id_tipo: { type: DataTypes.INTEGER },
    name: {
      type: DataTypes.VIRTUAL,
      get() {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `${this.getDataValue('nombre')} ${this.getDataValue(
          'apellido_paterno'
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        )} ${this.getDataValue('apellido_materno')}`;
      },
    },
  },
  {
    sequelize,
    tableName: 'Docente',
    timestamps: false,
  }
);

Teacher.belongsTo(TypeTeacher, { foreignKey: 'id_tipo' });
TypeTeacher.hasMany(Teacher, { foreignKey: 'id_tipo' });
Teacher.hasMany(Course, { foreignKey: 'id_docente' });
Course.belongsTo(Teacher, { foreignKey: 'id_docente' });

export { Teacher };
