import { Model, DataTypes } from 'sequelize';
import sequelize from '../index';
class CourseHasAlumno extends Model {
  id_curso!: number;
  matricula!: number;
}
CourseHasAlumno.init(
  {
    id_curso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    matricula: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'Curso_has_Alumno',
    timestamps: false,
  }
);

export { CourseHasAlumno };
