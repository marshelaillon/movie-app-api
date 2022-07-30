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
const validators_1 = require("../utils/validators");
const enums_1 = require("../enums/enums");
const searchInTMDB = require('../utils/searchInTMDB');
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, title } = req.body;
    if (!type || !title)
        return res.status(400).json({ message: 'All fields are required' });
    try {
        if ((0, validators_1.isString)(type) && (0, validators_1.isString)(title)) {
            if (Object.values(enums_1.Type).includes(type)) {
                const searchResults = yield searchInTMDB(type, title);
                return res.status(200).json(searchResults);
            }
        }
        return res.status(400).json({ message: 'Type is not valid' });
    }
    catch (error) {
        return res.sendStatus(400);
    }
});
module.exports = { getItem };
//# sourceMappingURL=itemController.js.map