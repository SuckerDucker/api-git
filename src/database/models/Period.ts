import { Model, DataTypes } from 'sequelize';
import sequelize from '../index';

class Period extends Model {
  id_periodo!: number;
  Estado!: number;
}

Period.init(
  {
    id_periodo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Estado: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    tableName: 'Periodo',
    timestamps: false,
  }
);

export { Period };
