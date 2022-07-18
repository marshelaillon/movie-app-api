require('express').Router();
const searchInTMDB = require('../utils/searchInTMDB');

const getItem = async (req, res) => {
  const { type, title } = req.body;
  if (!type || !title)
    return res.status(400).json({ message: 'Title is required' });
  try {
    const searchResults = await searchInTMDB(type, title);
    return res.status(200).json(searchResults);
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports = { getItem };
