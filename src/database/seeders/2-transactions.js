module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('transactions',
      [{
        id: 1,
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: 100
      },
      {
        id: 2,
        debitedAccountId: 2,
        creditedAccountId: 1,
        value: 100
      }
      ], { timestamps: true, updatedAt: false })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('transactions', null, {})
  }
}
