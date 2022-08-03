"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes, Model } = require('sequelize');
const db = require('../config/db');
class User extends Model {
}
User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 4,
            max: 20,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 8,
        },
    },
}, { sequelize: db, modelName: 'users' });
exports.default = User;
//# sourceMappingURL=User.js.map