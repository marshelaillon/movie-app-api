import { Request, Response } from 'express';
import { isString } from '../utils/validators';
import { Type } from '../enums/enums';
const searchInTMDB = require('../utils/searchInTMDB');

const getItem = async (req: Request, res: Response) => {
  const { type, title } = req.body;
  if (!type || !title)
    return res.status(400).json({ message: 'All fields are required' });
  try {
    if (isString(type) && isString(title)) {
      if (Object.values(Type).includes(type)) {
        const searchResults = await searchInTMDB(type, title);
        return res.status(200).json(searchResults);
      }
    }
    return res.status(400).json({ message: 'Type is not valid' });
  } catch (error) {
    return res.sendStatus(400);
  }
};

module.exports = { getItem };
