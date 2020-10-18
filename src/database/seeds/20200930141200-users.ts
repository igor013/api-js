'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cad_users', [


     { id_city: 1, name: 'admin', mail: 'admin@mail.com', age:29, password_hash: '$2a$08$EpUMqWedwhg1IvN2oCTz0uRCFf64aYzP/0BmkKuSUZtgfTzUxBKdu', created_at: new Date(), updated_at: new Date()},


    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cad_users', null, {});
  }
};
