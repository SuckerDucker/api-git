import { Model, DataTypes } from 'sequelize';
import sequelize from '../index';
import { Question } from './Question';

class CuestionarioAlumnoDocente extends Model {
  id_cuestionario_ad!: number;
  descripcion!: string;
}

CuestionarioAlumnoDocente.init(
  {
    id_cuestionario_ad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: { type: DataTypes.STRING },
  },
  {
    sequelize,
    tableName: 'CuestionarioAlumnoDocente',
    timestamps: false,
  }
);

CuestionarioAlumnoDocente.hasMany(Question, {
  foreignKey: 'id_cuestionario_ad',
  sourceKey: 'id_cuestionario_ad',
});

Question.belongsTo(CuestionarioAlumnoDocente, {
  foreignKey: 'id_cuestionario_ad',
  targetKey: 'id_cuestionario_ad',
});

export { CuestionarioAlumnoDocente };
