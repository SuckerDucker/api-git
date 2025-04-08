import { Model, DataTypes } from 'sequelize';
import sequelize from '../index';

class Question extends Model {
  id_pregunta!: number;
  id_cuestionario_ad!: number;
  pregunta!: string;
}

Question.init(
  {
    id_pregunta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_cuestionario_ad: { type: DataTypes.INTEGER },
    pregunta: { type: DataTypes.TEXT },
  },
  {
    sequelize,
    tableName: 'Pregunta',
    timestamps: false,
  }
);

export { Question };
