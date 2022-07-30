import User from './User';
import Favorite from './Favorite';

User.hasMany(Favorite);

module.exports = { User, Favorite };
