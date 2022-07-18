const axios = require('axios');

const searchTV = async id => {
  try {
    const search = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}&language=en-US&page=1&include_adult=false`
    );
    return search.data;
  } catch (error) {
    return { message: 'Something went wrong' };
  }
};

module.exports = searchTV;
