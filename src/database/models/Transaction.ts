import { DataTypes, Model } from 'sequelize';
import db from '.';

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
  modelName: 'users',
  timestamps: true,
  updatedAt: false
});

export default Transaction;