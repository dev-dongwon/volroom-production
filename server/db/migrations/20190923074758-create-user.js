'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(32)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(256)
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(256)
      },
      google_auth: {
        type: Sequelize.STRING(256)
      },
      position: {
        type: Sequelize.STRING(512)
      },
      photo: {
        type: Sequelize.STRING(512)
      },
      introduction: {
        type: Sequelize.TEXT
      },
      permission: {
        type: Sequelize.STRING(1),
        defaultValue: "Y"
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};