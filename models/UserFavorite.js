const { DataTypes, Model } = require('sequelize');
const db = require('../config/db');

class UserFavorite extends Model {}

UserFavorite.init(
  {
    userId: {
      type: DataTypes.INTEGER,
    },
    favoriteId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: 'user_favorites',
  }
);

module.exports = UserFavorite;
