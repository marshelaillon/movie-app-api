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
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const User = require('../models/User');
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    }
    // check if json web token exists & is verified
    if (token) {
        const tokenVerified = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        try {
            const { id } = tokenVerified;
            const user = yield User.findByPk(id);
            if (user) {
                req.user = user;
                next();
            }
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        catch (error) {
            return res.sendStatus(401);
        }
    }
    else {
        return res
            .status(401)
            .json({ message: 'You must be logged in to access this resource' });
    }
});
exports.requireAuth = requireAuth;
//# sourceMappingURL=requireAuth.js.map