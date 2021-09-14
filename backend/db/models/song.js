'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users'
      }
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Albums'
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
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
  Song.associate = function (models) {
    // associations can be defined here
    Song.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE' // delete song if user is deleted
    });
    Song.belongsTo(models.Album, {
      foreignKey: 'albumId',
      onDelete: 'CASCADE' // delete song if album is deleted
    });
  };
  return Song;
};
