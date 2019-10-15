"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(32)
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(256)
      },
      email: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(256)
      },
      google_auth: {
        type: DataTypes.STRING(256)
      },
      position: {
        type: DataTypes.STRING(512)
      },
      photo: {
        type: DataTypes.STRING(512)
      },
      introduction: {
        type: DataTypes.TEXT
      },
      permission: {
        type: DataTypes.STRING(1),
        defaultValue: "Y"
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
