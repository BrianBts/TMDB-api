const axios = require("axios");
const apiKey = require("../utils/api.key");

const tmdbApiKey = apiKey.tmdbApiKey;

class MoviesControllers {
  static async getAll(req, res, next) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}`
      );
      const movies = response.data.results;
      res.json(movies);
    } catch (error) {
      next(next);
    }
  }

  static async getByName(req, res) {
    const movieName = req.params.name;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${movieName}`
      );
      const movies = response.data.results;
      res.json(movies);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Hubo un problema al buscar la película por nombre." });
    }
  }

  static async getById(req, res, next) {
    const movieId = req.params.id;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}`
      );
      const movie = response.data;
      res.json(movie);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Hubo un problema al obtener la película." });
    }
  }
}

module.exports = MoviesControllers;
