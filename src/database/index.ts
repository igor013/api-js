import Sequelize from 'sequelize';

import databaseConfig from '../config/database';
import Accreditedcity from '../app/models/Accreditedcity';
import User from '../app/models/User';
import Address from '../app/models/Address';


const models = [
  Accreditedcity,
  User,  
  Address
];

class Database {

  constructor(){
    this.init();

  }

  init(){
    this.connection = new Sequelize(databaseConfig);

    models
    .map(model=> model.init(this.connection) )
    .map(model=> model.associate && model.associate(this.connection.models) );


  }




}

export default new Database();
