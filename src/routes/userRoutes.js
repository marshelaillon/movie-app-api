const userRouter = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');

const {
  register,
  login,
  getMe,
  logout,
  addFavorite,
  getFavorites,
  deleteFavorite,
} = require('../controllers/userController');

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/getMe', requireAuth, getMe);
// userRouter.get('/logout', requireAuth, logout);
// userRouter.post('/favorites', requireAuth, addFavorite);
// userRouter.get('/favorites', requireAuth, getFavorites);
// userRouter.delete('/favorites/:type/:tmdbId', requireAuth, deleteFavorite);

module.exports = userRouter;
