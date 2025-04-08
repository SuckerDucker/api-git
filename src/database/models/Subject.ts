import { Model, DataTypes } from 'sequelize';
import sequelize from '../index';

class Subject extends Model {
  id_materia!: number;
  nombre_materia!: string;
  nombre_corto_materia!: string;
}

Subject.init(
  {
    id_materia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_materia: { type: DataTypes.STRING },
    nombre_corto_materia: { type: DataTypes.STRING },
  },
  {
    sequelize,
    tableName: 'Materia',
    timestamps: false,
  }
);

export { Subject };
