const axios = require('axios');

const searchInTMDB = async (type, title) => {
  try {
    const search = await axios.get(
      `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.API_KEY}&language=en-US&query=${title}&page=1`
    );
    return search.data.results;
  } catch (error) {
    return { message: 'Something went wrong' };
  }
};

module.exports = searchInTMDB;

// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
// https://api.themoviedb.org/3/search/tv?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
