module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('transactions',
      [{
        debited_account_id: 1,
        credited_account_id: 2,
        value: 100,
        created_at: '2022-11-17 14:19:00.996 +00:00'
      },
      {
        debited_account_id: 2,
        credited_account_id: 1,
        value: 100,
        created_at: '2022-11-17 14:19:00.996 +00:00'
      },
      {
        debited_account_id: 3,
        credited_account_id: 2,
        value: 10,
        created_at: '2022-11-17 14:19:00.996 +00:00'
      }
      ])
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('transactions', null, {})
  }
}
