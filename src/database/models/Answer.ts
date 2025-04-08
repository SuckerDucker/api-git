import { Model, DataTypes } from 'sequelize';
import sequelize from '../index';
import { CuestionarioAlumnoDocente } from './CuestionarioAlumnoDocente';
import { Question } from './Question';

class Answer extends Model {
  id_encuesta!: number;
  id_pregunta!: number;
  id_cuestionario_ad!: number;
  puntuacion!: number;
}
Answer.init(
  {
    id_encuesta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_pregunta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_cuestionario_ad: {
      type: DataTypes.INTEGER,
      primaryKey: false,
    },
    puntuacion: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    tableName: 'Respuesta',
    timestamps: false,
  }
);
Answer.belongsTo(CuestionarioAlumnoDocente, {
  foreignKey: 'id_cuestionario_ad',
});
CuestionarioAlumnoDocente.hasMany(Answer, { foreignKey: 'id_cuestionario_ad' });
Answer.belongsTo(Question, { foreignKey: 'id_pregunta' });
Question.hasMany(Answer, { foreignKey: 'id_pregunta' });

export { Answer };
