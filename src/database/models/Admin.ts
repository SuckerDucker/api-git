import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../index';

class Admin extends Model {
  id!: number;
  user!: string;
  password!: string;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(password: string) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        this.setDataValue('password', hash);
      },
    },
  },
  {
    sequelize,
    tableName: 'admin',
    timestamps: false,
  }
);

export { Admin };
