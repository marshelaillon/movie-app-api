"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
const Favorite_1 = __importDefault(require("./Favorite"));
User_1.default.hasMany(Favorite_1.default);
Favorite_1.default.belongsTo(User_1.default);
module.exports = { User: User_1.default, Favorite: Favorite_1.default };
//# sourceMappingURL=index.js.map