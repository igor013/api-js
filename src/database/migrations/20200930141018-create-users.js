'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('cad_users', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      mail:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      age:{
        type: Sequelize.INTEGER,
        allowNull: false,
        
      },
      pass:{
        type: Sequelize.STRING,
        allowNull: false,
      
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cad_users');
  }
};
