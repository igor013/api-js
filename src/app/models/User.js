import Sequelize, { Model } from 'sequelize';

class User extends Model {

  static init(sequelize) {
    super.init({
      id_city: Sequelize.INTEGER,
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
 
static associate(models){
    this.belongsTo(models.Address, { foreignKey: 'id_user', as: 'user' });
  }


}

export default User;
