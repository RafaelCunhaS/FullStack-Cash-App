import { DataTypes, Model } from 'sequelize';
import db from '.';
import User from './User.model';

class Transaction extends Model {
  public id!: number;
  public debitedAccountId!: string;
  public creditedAccountId!: string;
  public value!: number;
  public createdAt!: Date;
}

Transaction.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  debitedAccountId: {
    type: DataTypes.INTEGER,
    references: { model: 'accounts', key: 'id' },
    allowNull: false,
  },
  creditedAccountId: {
    type: DataTypes.INTEGER,
    references: { model: 'accounts', key: 'id' },
    allowNull: false,
  },
  value: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'transactions',
  timestamps: true,
  updatedAt: false
});

Transaction.belongsTo(User, { as: 'debitedUser', targetKey: 'accountId',
foreignKey: 'debited_account_id' });

Transaction.belongsTo(User, { as: 'creditedUser', targetKey: 'accountId',
foreignKey: 'credited_account_id' });

export default Transaction;