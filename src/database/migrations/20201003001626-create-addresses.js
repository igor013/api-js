'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('cad_addresses', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_user: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {model:"cad_users",key:"id"},
        allowNull: false,
        onDelete: "CASCADE"       
      },
      address01:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      address02:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      reference:{
        type: Sequelize.STRING,
        allowNull: true,       
      },
      zipcode:{
        type: Sequelize.INTEGER,
        allowNull: false,        
      },
      state:{
        type: Sequelize.STRING,
        allowNull: false,      
      },
      city:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
   
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cad_addresses');
  }
};
