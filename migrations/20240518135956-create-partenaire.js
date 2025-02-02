'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Partenaires', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      partenaireName: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      adresse: {
        type: Sequelize.STRING
      },
      formule: {
        type: Sequelize.STRING
      },
      montant: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      reglement: {
        type: Sequelize.STRING
      },
      site: {
        type: Sequelize.STRING
      },
      activate: {
        type: Sequelize.BOOLEAN
      },
      texte: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Partenaires');
  }
};