'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partenaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Partenaire.init({
    partenaireName: DataTypes.STRING,
    contact: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    adresse: DataTypes.STRING,
    formule: DataTypes.STRING,
    montant: DataTypes.STRING,
    picture: DataTypes.STRING,
    reglement: DataTypes.STRING,
    site: DataTypes.STRING,
    activate: DataTypes.BOOLEAN,
    texte: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Partenaire',
  });
  return Partenaire;
};