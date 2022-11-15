module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('accounts',
      [{
        id: 1
      },
      {
        id: 2
      }
      ], { timestamps: false })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('accounts', null, {})
  }
}
