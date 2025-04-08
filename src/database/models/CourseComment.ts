import { Model, DataTypes } from 'sequelize';
import sequelize from '../index';

import { Course } from './Course';

class CourseComment extends Model {
  id_curso!: number;
  comentario!: number;
}

CourseComment.init(
  {
    id_curso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    comentario: { type: DataTypes.TEXT },
  },
  {
    sequelize,
    tableName: 'Curso_comentario',
    timestamps: false,
  }
);

CourseComment.belongsTo(Course, { foreignKey: 'id_curso' });
Course.hasMany(CourseComment, { foreignKey: 'id_curso' });

export { CourseComment };
