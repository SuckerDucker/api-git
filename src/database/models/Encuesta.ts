import { Model, DataTypes } from 'sequelize';
import sequelize from '../index';
import { Answer } from './Answer';
import { Course } from './Course';
import { CuestionarioAlumnoDocente } from './CuestionarioAlumnoDocente';

class Encuesta extends Model {
  id_encuesta!: number;
  matricula_alumno!: number;
  id_cuestionario_ad!: number;
  comentario!: string;
  estatus!: number;
}

Encuesta.init(
  {
    id_encuesta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_curso: { type: DataTypes.INTEGER },
    matricula_alumno: { type: DataTypes.INTEGER },
    id_cuestionario_ad: { type: DataTypes.INTEGER },
    estatus: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    tableName: 'Encuesta',
    timestamps: false,
  }
);

Encuesta.belongsTo(CuestionarioAlumnoDocente, {
  foreignKey: 'id_cuestionario_ad',
});
CuestionarioAlumnoDocente.hasMany(Encuesta, {
  foreignKey: 'id_cuestionario_ad',
});
Encuesta.belongsTo(Course, { foreignKey: 'id_curso' });
Course.hasMany(Encuesta, { foreignKey: 'id_curso' });
Encuesta.hasMany(Answer, { foreignKey: 'id_encuesta' });
Answer.belongsTo(Encuesta, { foreignKey: 'id_encuesta' });

export { Encuesta };
