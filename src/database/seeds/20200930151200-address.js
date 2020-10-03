'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cad_addresses', [


     { id_user: 1, address01: 'Rua parana, 70', address02: 'centro', reference: '2 piso', zipcode: '29830000', state: 'ES', city: 'Nova Venécia', created_at: new Date(), updated_at: new Date()},


    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cad_addresses', null, {});
  }
};
