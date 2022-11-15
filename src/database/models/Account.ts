import { DataTypes, Model } from 'sequelize';
import db from '.';
import Transaction from './Transaction';

class Account extends Model {
  public id!: number;
  public balance!: number;
}

Account.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  balance: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
});

Account.hasMany(Transaction, { sourceKey: 'id', as: 'transactions'})

export default Account;