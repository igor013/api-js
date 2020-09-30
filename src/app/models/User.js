import Sequelize, { Model } from 'sequelize';

class User extends Model {

  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      mail: Sequelize.STRING,
      age: Sequelize.INTEGER,
      pass: Sequelize.STRING,
      
    
    },
      {
        sequelize,
        tableName: 'cad_users'
      }
    );
    
     return this;

  }
 

}

export default User;
