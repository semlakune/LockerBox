'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserLockers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users"
        }
      },
      LockerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Lockers"
        }
      },
      password: {
        type: Sequelize.STRING
      },
      contentType: {
        type: Sequelize.STRING
      },
      wrongCount: {
        type: Sequelize.INTEGER
      },
      passwordCount: {
        type: Sequelize.INTEGER
      },
      dayCount: {
        type: Sequelize.INTEGER
      },
      isBlocked: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('UserLockers');
  }
};