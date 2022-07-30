"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPasswordCorrect = exports.isValidPassword = exports.isString = void 0;
const bcryptjs_1 = require("bcryptjs");
const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const isString = (value) => {
    return typeof value === 'string' || value instanceof String;
};
exports.isString = isString;
const isValidPassword = function (password) {
    return regexp.test(password) ? true : false;
};
exports.isValidPassword = isValidPassword;
const isPasswordCorrect = (passedPassword, hashedPassword) => {
    return (0, bcryptjs_1.compareSync)(passedPassword, hashedPassword);
};
exports.isPasswordCorrect = isPasswordCorrect;
//# sourceMappingURL=validators.js.map