module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      balance: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 100,
        allowNull: false
      }
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('accounts')
  }
}
