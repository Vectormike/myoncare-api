const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const userService = require('../services/user.service');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send({ user });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.loginUserWithEmailAndPassword(email, password);
  res.send({ user });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.send({ user });
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const fetchUsers = catchAsync(async (req, res) => {
  const users = await userService.fetchUsers();
  res.send(users);
});

module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  fetchUsers,
};
