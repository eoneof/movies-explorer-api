import mongoose from 'mongoose';
import isURL from 'validator/lib/isURL.js';
import BadRequestError from '../errors/BadRequestError.js';
import ConflictError from '../errors/ConflictError.js';
import { BAD_REQUEST_TXT, DB_DUPLICATE_KEY_CODE, MOVIE_EXIST_TXT } from '../utils/constants.js';
import { validationErrorHandler } from '../utils/utils.js';

const movieSchema = new mongoose.Schema({
  movieId: {
    required: true,
    unique: true,
    type: String,
  },
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: (image) => isURL(image),
    },
  },
  trailer: {
    required: true,
    type: String,
    validate: {
      validator: (image) => isURL(image),
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (image) => isURL(image),
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
});

movieSchema.statics.createNew = async function createNew(movieProps) {
  let movieEntry;
  try {
    movieEntry = await this.create(movieProps);
    if (!movieEntry) throw new BadRequestError(BAD_REQUEST_TXT);

    movieEntry = movieEntry.toObject();
    delete movieEntry.__v;
  } catch (err) {
    validationErrorHandler(err);
    if (err.code === DB_DUPLICATE_KEY_CODE) { // mongo err
      throw new ConflictError(MOVIE_EXIST_TXT);
    }
  }
  return movieEntry;
};

export default mongoose.model('movie', movieSchema);