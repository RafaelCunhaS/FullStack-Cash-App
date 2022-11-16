module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('accounts',
      [{
        balance: 100
      },
      {
        balance: 100
      }
      ])
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('accounts', null, {})
  }
}
