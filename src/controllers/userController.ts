import { Request, Response } from 'express';
import { Type } from '../enums/enums';
import {
  isString,
  isValidPassword,
  isPasswordCorrect,
} from '../utils/validators';
import { hash } from 'bcryptjs';
const { User, Favorite } = require('../models/');
const generateToken = require('../utils/generateToken');
const searchMovie = require('../utils/searchMovie');
const searchTV = require('../utils/searchTV');

interface UserInfo {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return { message: 'All fields are required' };
  if (
    isString(username) &&
    isString(email) &&
    isString(password) &&
    isValidPassword(password)
  ) {
    try {
      const user = await User.create({
        username,
        email,
        password: await hash(password, 8),
      });
      return res.status(201).json(user);
    } catch (e) {
      return res.status(400).json({ error: (e as Error).message });
    }
  }
  return res.status(400).json({
    message:
      'Password must have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'All fields are required' });
  if (isString(email) && isString(password)) {
    try {
      const user = await User.findOne({ where: { email } });
      if (user && isPasswordCorrect(password, user.password)) {
        const { email, username } = user;
        req.user = user;
        return res
          .status(200)
          .json({ email, username, token: generateToken(user.id) });
      }
      return res.status(400).json({ message: 'Invalid credentials' });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
  return res.status(400);
};

const getMe = async (req: Request, res: Response) => {
  const user: UserInfo = req.user as UserInfo;
  const id = user.id;
  try {
    const user = await User.findByPk(id);
    if (user) return res.status(200).json(user);
    return res.status(401).json({ message: 'Not authorized' });
  } catch (error) {
    return res.status(400);
  }
};

const logout = async (req: Request, res: Response) => {
  const user: UserInfo = req.user as UserInfo;
  const id = user.id;
  try {
    const user = await User.findOne({ where: { id } });
    if (user) {
      req.user = null;
      return res.status(200).json({});
    }
    return res.status(401).json({ message: 'Not authorized' });
  } catch (error) {
    return res.status(401);
  }
};

const addFavorite = async (req: Request, res: Response) => {
  const user: UserInfo = req.user as UserInfo;
  const id = user.id;
  const tmdbId: number = req.body.tmdbId;
  const type: Type = req.body.type;

  try {
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(401).json({ message: 'Not authorized' });
    if (!tmdbId || !type)
      return res.status(400).json({ message: 'All fields are required' });
    const [_, created] = await Favorite.findOrCreate({
      where: { tmdbId, type, userId: id },
    });
    if (created) return res.status(201).json('Favorite added');
    return res.status(400).json({ message: 'Favorite already exists' });
  } catch (e) {
    return res.status(400).json({ error: (e as Error).message });
  }
};

const getFavorites = async (req: Request, res: Response) => {
  const user: UserInfo = req.user as UserInfo;
  const id = user.id;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(401).json({ message: 'Not authorized' });
    const favorites = await user.getFavorites();
    if (favorites.length) {
      const result = await Promise.allSettled(
        favorites.map(
          async (favorite: { dataValues: { tmdbId: number; type: Type } }) => {
            const { tmdbId, type } = favorite.dataValues;
            try {
              if (type === 'movie') {
                const movie = await searchMovie(tmdbId);
                if (movie) return movie;
              } else if (type === 'tv') {
                const tv = await searchTV(tmdbId);
                if (tv) return tv;
              }
            } catch (e) {
              res.status(400).json({ error: (e as Error).message });
            }
          }
        )
      );
      const response = result.map((item) => {
        if (item.status === 'fulfilled') return item.value;
      });
      return res.status(200).send(response);
    }
    return res.status(400).json({ message: 'No favorites' });
  } catch (e) {
    return res.status(400).json({ e: (e as Error).message });
  }
};

const deleteFavorite = async (req: Request, res: Response) => {
  const user: UserInfo = req.user as UserInfo;
  const id = user.id;
  const { tmdbId, type } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(401).json({ message: 'Not authorized' });
    const favorite = await Favorite.findOne({
      where: { tmdbId, type, userId: id },
    });
    if (!favorite)
      return res.status(400).json({ message: 'Favorite not found' });
    await favorite.destroy();
    return res.status(200).json({ message: 'Favorite deleted' });
  } catch (e) {
    return res.status(400).json({ error: (e as Error).message });
  }
};

module.exports = {
  register,
  login,
  getMe,
  logout,
  addFavorite,
  getFavorites,
  deleteFavorite,
};
