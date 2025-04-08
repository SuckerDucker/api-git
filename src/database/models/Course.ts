import { Model, DataTypes } from 'sequelize';
import sequelize from '../index';
import { Subject } from './Subject';
import { Period } from './Period';

class Course extends Model {
  id_curso!: number;
  id_periodo!: number;
  id_materia!: number;
  id_grupo!: number;
  id_docente!: number;
}

Course.init(
  {
    id_curso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_periodo: { type: DataTypes.INTEGER },
    id_materia: { type: DataTypes.INTEGER },
    id_grupo: { type: DataTypes.INTEGER },
    id_docente: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    tableName: 'Curso',
    timestamps: false,
  }
);

Course.belongsTo(Subject, { foreignKey: 'id_materia' });
Subject.hasMany(Course, { foreignKey: 'id_materia' });
Course.belongsTo(Period, { foreignKey: 'id_periodo' });
Period.hasMany(Course, { foreignKey: 'id_periodo' });

export { Course };
