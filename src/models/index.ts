import User from './User';
import Favorite from './Favorite';

User.hasMany(Favorite);
Favorite.belongsTo(User);

module.exports = { User, Favorite };
