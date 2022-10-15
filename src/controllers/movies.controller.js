import NotFoundError from '../errors/NotFoundError.js';
import movieModel from '../models/movie.model.js';

import { CREATED, MOVIE_NOT_FOUND_TXT, MOVIE_DELETED_TXT } from '../utils/constants.js';

const Movie = movieModel;

/**
 * Add a movie to favorites list
 * @param { object } movieProps movie properties
 * @returns { movieEntry } movie entry
 */
export async function createMovie(req, res, next) {
  try {
    const { user } = req.cookies;
    const { ...movieProps } = req.body;
    const movieEntry = await Movie.createNew({ owner: user._id, ...movieProps });
    return res.status(CREATED).send(movieEntry);
  } catch (err) {
    next(err);
  }
  return next();
}

/**
 * Get current movie info
 * @returns {[{}]} an array of movies
 */
export async function getMovies(req, res, next) {
  try {
    const moviesList = await Movie.find({});
    if (!moviesList) return next(new NotFoundError(MOVIE_NOT_FOUND_TXT));
    const arr = [];

    moviesList.forEach((item) => {
      const movie = item.toObject();
      delete movie.__v;
      arr.push(movie);
    });

    return res.send(arr);
  } catch (err) {
    next(err);
  }
  return next();
}

/**
 * Delete a movie entry
 * @returns deleted item
 */
export async function deleteMovieById(req, res, next) {
  try {
    const { id } = req.params;
    let movieEntry = await Movie.findByIdAndDelete(id);
    if (!movieEntry) return next(new NotFoundError(MOVIE_NOT_FOUND_TXT));

    movieEntry = movieEntry.toObject();
    delete movieEntry.__v;

    res.send({ message: MOVIE_DELETED_TXT, movieEntry });
    return next();
  } catch (err) {
    next(err);
  }
  return next();
}
