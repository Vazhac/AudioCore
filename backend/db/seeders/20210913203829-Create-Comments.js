'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      { userId: 1, songId: 15, body: "Hello World ", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, songId: 15, body: "Hello World ", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, songId: 15, body: "Hello World ", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, songId: 15, body: "Hello World ", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, songId: 15, body: "Hello World ", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, songId: 15, body: "Hello World ", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, songId: 15, body: "Hello World ", createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, songId: 15, body: "Hello World ", createdAt: new Date(), updatedAt: new Date() },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});

  }
};
