require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const validatePassword = require('../utils/validatePassword');

const registerUser = async (req, res) => {
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

module.exports = { registerUser };
