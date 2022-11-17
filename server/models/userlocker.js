'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLocker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserLocker.belongsTo(models.User)
      UserLocker.belongsTo(models.Locker)
    }
  }
  UserLocker.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "User ID is required"},
        notEmpty: {msg: "User ID is required"},
      },
      references: {
        model: "Users"
      }
    },
    LockerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Locker ID is required"},
        notEmpty: {msg: "Locker ID is required"},
      },
      references: {
        model: "Lockers"
      }
    },
    password: DataTypes.STRING,
    contentType: DataTypes.STRING,
    wrongCount: DataTypes.INTEGER,
    passwordCount: DataTypes.INTEGER,
    dayCount: DataTypes.INTEGER,
    isBlocked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserLocker',
  });
  return UserLocker;
};