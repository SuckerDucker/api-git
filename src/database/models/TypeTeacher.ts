import { Model, DataTypes } from 'sequelize';
import sequelize from '../index';

class TypeTeacher extends Model {
  id_tipo!: number;
  clave_tipo!: string;
  description!: string;
}

TypeTeacher.init(
  {
    id_tipo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clave_tipo: { type: DataTypes.STRING(10) },
    descripcion: { type: DataTypes.STRING(50) },
  },
  {
    sequelize,
    tableName: 'tipo_docente',
    timestamps: false,
  }
);

export { TypeTeacher };
