import userModel from '../models/userModel.js';

const User = userModel;

export async function createUser(req, res, next) {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
    next(err);
  }
}

export async function getUser(req, res) {
  try {
    res.send({ user: { User, method: req.method, route: '/users/me' } });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function updateUser(req, res) {
  try {
    res.send({ user: { User, method: req.method, route: '/users/me' } });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    res.send({ user: { User, method: req.method, route: '/users/me' } });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}