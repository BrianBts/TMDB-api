const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: false,
  },

  description: {
    type: String,
    required: false,
  },

  img: {
    type: String,
    required: false,
  },
});

const Movies = mongoose.model("Movies", moviesSchema);
module.exports = Movies;
