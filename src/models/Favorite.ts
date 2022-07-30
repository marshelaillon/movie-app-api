const { DataTypes, Model } = require('sequelize');
const db = require('../config/db');

class Favorite extends Model {}

Favorite.init(
  {
    type: DataTypes.STRING, // movie or tv
    tmdbId: DataTypes.INTEGER,
  },
  {
    sequelize: db,
    modelName: 'favorites',
  }
);

export default Favorite;
