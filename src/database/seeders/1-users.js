module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users',
      [{
        id: 1,
        username: 'João  da Silva',
        password: 123456,
        accountId: 1
      },
      {
        id: 2,
        username: 'Maria Chiquinha',
        password: 654321,
        accountId: 2
      }
      ], { timestamps: false })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}
