import { Model, DataTypes } from 'sequelize';
import sequelize from '../index';

import { Group } from './Group';

class Career extends Model {
  id_carrera!: number;
  nombre_carrera!: string;
  nombre_corto!: string;
  correo_institucional!: string;
  status!: number;
}

Career.init(
  {
    id_carrera: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_carrera: { type: DataTypes.STRING(60) },
    nombre_corto: { type: DataTypes.STRING(50) },
    correo_institucional: { type: DataTypes.STRING(120) },
    status: { type: DataTypes.TINYINT({ length: 1 }) },
  },
  {
    sequelize,
    tableName: 'Carrera',
    timestamps: false,
  }
);

Career.hasMany(Group, { foreignKey: 'id_carrera' });
Group.belongsTo(Career, { foreignKey: 'id_carrera' });

export { Career };
