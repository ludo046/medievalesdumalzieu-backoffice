'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    troupe: DataTypes.BOOLEAN,
    campement: DataTypes.BOOLEAN,
    artisan: DataTypes.BOOLEAN,
    animation: DataTypes.BOOLEAN,
    marche: DataTypes.BOOLEAN,
    partenaire: DataTypes.BOOLEAN,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};