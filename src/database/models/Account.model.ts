import { DataTypes, Model } from 'sequelize';
import db from '.';
import Transaction from './Transaction.model';

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
    defaultValue: 100
  }
}, {
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
});

export default Account;