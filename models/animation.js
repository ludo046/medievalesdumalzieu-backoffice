'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Animation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Animation.init({
    companieName: DataTypes.STRING,
    contact: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    person: DataTypes.INTEGER,
    ville: DataTypes.STRING,
    pays: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    activate: DataTypes.BOOLEAN,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Animation',
  });
  return Animation;
};