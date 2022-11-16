import { DataTypes, Model } from 'sequelize';
import db from '.';
import md5 from 'md5';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public accountId!: number;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value: string) { this.setDataValue('password', md5(value)) }
  },
  accountId: {
    type: DataTypes.INTEGER,
    references: { model: 'accounts', key: 'id' },
    allowNull: false
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;