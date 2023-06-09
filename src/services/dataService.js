import axios from "axios";

const apiKey = "8d181bcb5e80a929053da01f6921e4a9";

export default {
  getMovies: (category) => {
    const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=1`;
    return axios.get(url).then((info) => info.data);
  },
  getSearch: (query) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`;
    return axios.get(url).then((info) => info.data);
  },
  getMovieById: (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`;
    return axios.get(url).then((info) => info.data);
  },
  getMostVoted: () => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=8d181bcb5e80a929053da01f6921e4a9&language=en-US&page=1`;
    return axios.get(url).then((info) => info.data);
  }
};
