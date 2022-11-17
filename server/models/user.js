'use strict';
const { hashSync } = require("bcryptjs")
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
      User.belongsToMany(models.Locker, { through: models.UserLocker })
    }
  }
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name is required" },
        notNull: { msg: "Name is required" },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Email already registered" },
      validate: {
        notEmpty: { msg: "Email is required" },
        notNull: { msg: "Email is required" },
        isEmail: { msg: "Input must be email format" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password is required" },
        notNull: { msg: "Password is required" },
        len: {
          args: [8, 100],
          msg: "Passwords must be at least 8 characters"
        }
      }
    },
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = hashSync(user.password, 8)
  })
  return User;
};