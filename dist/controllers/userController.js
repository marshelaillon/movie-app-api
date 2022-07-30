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
const bcryptjs_1 = require("bcryptjs");
const { User } = require('../models/');
const generateToken = require('../utils/generateToken');
//const searchMovie = require('../utils/searchMovie');
//const searchTV = require('../utils/searchTV');
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
        return { message: 'All fields are required' };
    if ((0, validators_1.isString)(username) &&
        (0, validators_1.isString)(email) &&
        (0, validators_1.isString)(password) &&
        (0, validators_1.isValidPassword)(password)) {
        try {
            const user = yield User.create({
                username,
                email,
                password: yield (0, bcryptjs_1.hash)(password, 8),
            });
            return res.status(201).json(user);
        }
        catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }
    return res.status(400).json({
        message: 'Password must have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
    });
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'All fields are required' });
    if ((0, validators_1.isString)(email) && (0, validators_1.isString)(password)) {
        try {
            const user = yield User.findOne({ where: { email } });
            if (user && (0, validators_1.isPasswordCorrect)(password, user.password)) {
                const { email, username } = user;
                req.user = user;
                return res
                    .status(200)
                    .json({ email, username, token: generateToken(user.id) });
            }
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    return res.status(400);
});
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* const id: number | undefined = req.user?.id;
    try {
      const user = await User.findOne({ where: { id } });
      if (user) return res.status(200).json(user);
      res.status(401).json({ message: 'Not authorized' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    } */
    return res.send(req.user);
});
/*
const logout = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const user = await User.findOne({ where: { id } });
    if (user) {
      req.user = null;
      return res.status(200).json({});
    }
    res.sendStatus(401);
  } catch (error) {
    res.status(401).json({ error: 'Something went wrong!' });
  }
};

const addFavorite = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { tmdbId, type } = req.body;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(401).json({ message: 'Not authorized' });
    if (!tmdbId || !type)
      return res.status(400).json({ message: 'All fields are required' });
    const [_, created] = await Favorite.findOrCreate({
      where: { tmdbId, type, userId: id },
    });
    if (created) return res.status(201).json('Favorite added');
    res.status(400).json({ message: 'Favorite already exists' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFavorites = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(401).json({ message: 'Not authorized' });
    const favorites = await Favorite.findAll({
      where: { userId: id },
    });
    if (favorites.length) {
      const result = await Promise.allSettled(
        favorites.map(async (favorite) => {
          const { tmdbId, type } = favorite.dataValues;
          try {
            if (type === 'movie') {
              const movie = await searchMovie(tmdbId);
              return movie;
            } else if (type === 'tv') {
              const tv = await searchTV(tmdbId);
              return tv;
            }
          } catch (error) {
            res.status(400).json({ error: error.message });
          }
        })
      );
      return res.status(200).send(result);
    }
    res.status(400).json({ message: 'No favorites' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFavorite = async (req: Request, res: Response) => {
  const { id } = req.user;
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
    res.status(200).json({ message: 'Favorite deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; */
module.exports = {
    register,
    login,
    getMe,
    /*
    logout,
    addFavorite,
    getFavorites,
    deleteFavorite, */
};
//# sourceMappingURL=userController.js.map