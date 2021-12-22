const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;

// User.methods.generateHash = function (password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
