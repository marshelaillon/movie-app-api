require('express').Router();
const searchItem = require('../utils/searchItem');

const getItem = async (req, res) => {
  const { type, title } = req.body;
  if (!type || !title)
    return res.status(400).json({ message: 'Title is required' });
  try {
    const searchResults = await searchItem(type, title);
    return res.status(200).json(searchResults);
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports = { getItem };
