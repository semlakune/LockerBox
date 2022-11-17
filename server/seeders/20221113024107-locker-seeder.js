'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const lockers = [
      {
        lockerNumber: 1,
        isAvailable: true,
        content: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lockerNumber: 2,
        isAvailable: true,
        content: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lockerNumber: 3,
        isAvailable: true,
        content: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lockerNumber: 4,
        isAvailable: true,
        content: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lockerNumber: 5,
        isAvailable: true,
        content: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lockerNumber: 6,
        isAvailable: true,
        content: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lockerNumber: 7,
        isAvailable: true,
        content: "",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert('Lockers', lockers)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Lockers', null, {})
  }
};
