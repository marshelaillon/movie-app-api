const userRouter = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');
const {
  register,
  login,
  getMe,
  logout,
} = require('../controllers/userController');

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/getMe', requireAuth, getMe);
userRouter.get('/logout', requireAuth, logout);

module.exports = userRouter;
