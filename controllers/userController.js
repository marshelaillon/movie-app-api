require('express').Router();
const { User, Favorite } = require('../models/');
const bcrypt = require('bcryptjs');
const validatePassword = require('../utils/validatePassword');
const isMatch = require('../utils/isMatch');
const generateToken = require('../utils/generateToken');
const searchMovie = require('../utils/searchMovie');
const searchTV = require('../utils/searchTV');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (validatePassword(password)) {
    try {
      const user = await User.create({
        username,
        email,
        password: await bcrypt.hash(password, 8),
      });
      res.status(201).json({ user, message: 'Register successfull' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({
      message:
        'Password must have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid email' });
    if (user && isMatch(password, user.password)) {
      const { email, username } = user;
      return res
        .status(200)
        .json({ email, username, token: generateToken(user.id) });
    }
    res.status(400).json({ message: 'Invalid password' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMe = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findOne({ where: { id } });
    if (user) return res.status(200).json(user);
    res.status(401).json({ message: 'Not authorized' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = async (req, res) => {
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

const addFavorite = async (req, res) => {
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

const getFavorites = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(401).json({ message: 'Not authorized' });
    const favorites = await Favorite.findAll({
      where: { userId: id },
    });
    if (favorites.length) {
      const result = await Promise.allSettled(
        favorites.map(async favorite => {
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

const deleteFavorite = async (req, res) => {
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
