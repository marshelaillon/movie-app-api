"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes, Model } = require('sequelize');
const db = require('../config/db');
class Favorite extends Model {
}
Favorite.init({
    type: DataTypes.STRING,
    tmdbId: DataTypes.INTEGER,
}, {
    sequelize: db,
    modelName: 'favorites',
});
exports.default = Favorite;
//# sourceMappingURL=Favorite.js.map