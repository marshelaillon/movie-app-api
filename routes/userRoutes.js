const userRouter = require('express').Router();
const { registerUser } = require('../controllers/userController');

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
userRouter.post('/register', registerUser);

module.exports = userRouter;
