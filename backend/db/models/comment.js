'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users"
        },
      },
      songId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Songs"
        },
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
    }, {});
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE", //deletes the comment if the user is deleted
    });
    Comment.belongsTo(models.Song, {
      foreignKey: "songId",
      onDelete: "CASCADE", //deletes the comment if the song is deleted
    });
  };
  return Comment;
};
