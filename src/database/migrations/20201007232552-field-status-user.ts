'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('cad_users', 'status', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "A"
    });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('cad_users', 'status');
  }
};
