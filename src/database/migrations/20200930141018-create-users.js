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
      id_city: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {model:"cad_accreditedcities",key:"id"},
        allowNull: false,
        onDelete: "CASCADE"       
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
      password_hash: {
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
