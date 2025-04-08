import { Model, DataTypes } from 'sequelize';
import sequelize from '../index';
import { Course } from './Course';

class Group extends Model {
  id_grupo!: number;
  clave_grupo!: string;
  id_carrera!: number;
}

Group.init(
  {
    id_grupo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    clave_grupo: { type: DataTypes.STRING },
    id_carrera: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    tableName: 'Grupo',
    timestamps: false,
  }
);

Group.hasMany(Course, { foreignKey: 'id_grupo' });
Course.belongsTo(Group, { foreignKey: 'id_grupo' });

export { Group };
