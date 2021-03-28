'use strict';

const crypto = require('crypto');

const tempPassword = crypto
  .pbkdf2Sync('12345aA!', process.env.PASSWORD_SALT, 1000, 64, 'sha512')
  .toString('hex');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('Users', [
        {
          id: '0bd61925-6a5f-468a-b1e5-8eb2f295c4be',
          firstName: 'Soyeon',
          lastName: 'Jeon',
          email: 'soyeon@mail.com',
          password: tempPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '14d23e5c-8619-45f1-8576-71b669a980fa',
          firstName: 'Minnie',
          lastName: 'Kim',
          email: 'minnie@mail.com',
          password: tempPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '604fff58-1ad4-4cf3-bf86-621f7efdcbd8',
          firstName: 'Yuqi',
          lastName: 'Song',
          email: 'yuqi@mail.com',
          password: tempPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'e3a2c077-f3de-449a-83ca-367c24bbb716',
          firstName: 'Miyeon',
          lastName: 'Cho',
          email: 'miyeon@mail.com',
          password: tempPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '8996112d-5ce0-43b8-a578-d540e395596d',
          firstName: 'Soojin',
          lastName: 'Seo',
          email: 'soojin@mail.com',
          password: tempPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'c8ad6045-70ce-4a15-a340-9bc306a6dd9e',
          firstName: 'Shuhua',
          lastName: 'Yeh',
          email: 'shuhua@mail.com',
          password: tempPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('Users', null, {});
    } catch (error) {
      console.log(error);
    }
  },
};
