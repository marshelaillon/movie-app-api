"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../models/User"));
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (token) {
            const jwtPayload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
            const { id } = jwtPayload;
            const user = yield User_1.default.findByPk(id);
            if (user) {
                req.user = user;
                return next();
            }
        }
        return res.status(401).json({ message: 'No token provided' });
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
});
module.exports = requireAuth;
//# sourceMappingURL=requireAuth.js.map