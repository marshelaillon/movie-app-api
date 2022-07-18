const itemRouter = require('express').Router();
const { getItem } = require('../controllers/itemController');

itemRouter.post('/search', getItem);

module.exports = itemRouter;
