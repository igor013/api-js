'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cad_accreditedcities', [


     { name: 'Nova Venécia', cep: '29830000', created_at: new Date(), updated_at: new Date()},


    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cad_accreditedcities', null, {});
  }
};
