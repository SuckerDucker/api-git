import { Model, DataTypes } from 'sequelize';
import sequelize from '../index';

import { CourseHasAlumno } from './CourseHasStudent';
import { Encuesta } from './Encuesta';

class Student extends Model {
  matricula!: number;
  apellido_paterno!: string;
  apellido_materno!: string;
  nombre!: string;
}

Student.init(
  {
    matricula: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    apellido_paterno: { type: DataTypes.STRING },
    apellido_materno: { type: DataTypes.STRING },
    nombre: { type: DataTypes.STRING },
  },
  {
    sequelize,
    tableName: 'Alumno',
    timestamps: false,
  }
);

Student.hasMany(CourseHasAlumno, { foreignKey: 'matricula' });
CourseHasAlumno.belongsTo(Student, { foreignKey: 'matricula' });

Student.hasMany(Encuesta, { foreignKey: 'matricula_alumno' });
Encuesta.belongsTo(Student, { foreignKey: 'matricula_alumno' });

export { Student };
