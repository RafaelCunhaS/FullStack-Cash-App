module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      accountId: {
        field: 'account_id',
        type: Sequelize.INTEGER,
        references: { model: 'accounts', key: 'id' },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users')
  }
}
