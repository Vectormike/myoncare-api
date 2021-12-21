const jwt = require('express-jwt');
const config = require('../../config/config');

/**
 * We are assuming that the JWT will come in a header with the form
 *
 * Authorization: Bearer ${JWT}
 *
 */
const getTokenFromHeader = (req) => {
  if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') || (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const isAuth = jwt({
  secret: config.jwt.secret, // The _secret_ to sign the JWTs
  algorithms: [config.jwt.jwtAlgorithm], // JWT Algorithm
  userProperty: 'token',
  getToken: getTokenFromHeader, // How to extract the JWT from the request
});

module.exports = isAuth;
