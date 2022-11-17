'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Locker.belongsToMany(models.User, { through: models.UserLocker })
    }
  }
  Locker.init({
    lockerNumber: DataTypes.INTEGER,
    isAvailable: DataTypes.BOOLEAN,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Locker',
  });
  return Locker;
};