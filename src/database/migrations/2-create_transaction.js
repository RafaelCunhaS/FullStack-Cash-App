module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      debited_account_id: {
        type: Sequelize.INTEGER,
        references: { model: 'accounts', key: 'id' },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      credited_account_id: {
        type: Sequelize.INTEGER,
        references: { model: 'accounts', key: 'id' },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      value: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('transactions')
  }
}
