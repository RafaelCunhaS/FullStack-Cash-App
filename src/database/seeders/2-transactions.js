module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('transactions',
      [{
        debited_account_id: 1,
        credited_account_id: 2,
        value: 100,
        created_at: new Date(2022, 10, 15, 00)
      },
      {
        debited_account_id: 2,
        credited_account_id: 1,
        value: 100,
        created_at: new Date(2022, 10, 15, 00)
      }
      ])
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('transactions', null, {})
  }
}
