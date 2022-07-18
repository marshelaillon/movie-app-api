const userRouter = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/getMe', requireAuth, getMe);

module.exports = userRouter;
