import Sequelize, { Model } from 'sequelize';

class Accreditedcity extends Model {

  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      cep: Sequelize.STRING,
    },
    {
      sequelize,
      tableName: 'cad_accreditedcities'
    }
  );

  return this;

}

}

export default Accreditedcity;
