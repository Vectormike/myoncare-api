const config = require('../../config/config');
const httpStatus = require('http-status');
const User = require('../models/user.model');
const ApiError = require('../../utils/ApiError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  // Check if email exists
  const emailExists = await User.findOne({ where: { email: userBody.email } });
  if (emailExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This email address exists 🥲');
  }

  let password = await bcrypt.hash(userBody.password, 8);

  const newUser = await User.create({
    name: userBody.name,
    email: userBody.email,
    password,
  });

  const token = generateJWT(newUser);
  await User.update({ token }, { where: { id: newUser.id } });

  const user = await User.findOne({ where: { id: newUser.id } });

  return user;
};

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  // Check if email exists
  const response = await User.findOne({ where: { email } });
  if (!response) {
    throw new ApiError(httpStatus.BAD_REQUEST, `This user doesn't exists 🥲`);
  }

  // Check if password match
  const passwordMatch = await bcrypt.compare(password, response.password);
  if (!passwordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  const token = generateJWT(response);

  await User.update({ token }, { where: { id: response.id } });

  const user = await User.findOne({ where: { id: response.id } });

  return user;
};

/**
 * Update user
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUser = async (userId, updateBody) => {
  // Check if user exists
  const userExists = await User.findOne({ where: { id: userId } });
  if (!userExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, `This user doesn't exists 🥲`);
  }
  await User.update(updateBody, { where: { id: userExists.id } });

  const user = await User.findOne({ where: { id: userExists.id } });

  return user;
};

const deleteUser = async (userId) => {
  // Check if user exists
  const userExists = await User.findOne({ where: { id: userId } });
  if (!userExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, `This user doesn't exists 🥲`);
  }
  await User.destroy({ where: { id: userId } });
  return userExists;
};

const fetchUsers = async () => {
  const users = await User.findAll();
  return users;
};

const generateJWT = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    config.jwt.secret,
    { expiresIn: 1200 }
  );
};

module.exports = { createUser, loginUserWithEmailAndPassword, updateUser, deleteUser, fetchUsers };
