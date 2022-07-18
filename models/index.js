const User = require('./User');
const Favorite = require('./Favorite');

User.hasMany(Favorite);

module.exports = { User, Favorite };
