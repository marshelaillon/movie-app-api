require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const validatePassword = require('../utils/validatePassword');
const isMatch = require('../utils/isMatch');
const generateToken = require('../utils/generateToken');

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
      res.status(400).json({ error: error.errors[0].message });
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

module.exports = { register, login, getMe, logout };
