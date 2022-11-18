module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('accounts',
      [{
        balance: 100
      },
      {
        balance: 110
      },
      {
        balance: 90
      }
      ])
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('accounts', null, {})
  }
}
