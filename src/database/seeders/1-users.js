const md5 = require('md5')

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users',
      [{
        username: 'Joaozinho',
        password: md5('1234567Z'),
        account_id: 1
      },
      {
        username: 'Mariazinha',
        password: md5('Z7654321'),
        account_id: 2
      },
      {
        username: 'Zezinho',
        password: md5('ASDFGHJ1'),
        account_id: 3
      }
      ])
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}
