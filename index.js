const express = require('express');
const helmet = require('helmet');
const config = require('./config/config');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');
const { errorConverter, errorHandler } = require('./app/middlewares/error');
const routes = require('./app/routes/');
const sequelize = require('./config/database');
const logger = require('./config/logger');

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// api routes
app.use('/', routes);

app.get('/ping', (req, res) => res.send('Ping Pong!'));

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(process.env.PORT);
    logger.info(`App listening on port ${config.port}`);
  })
  .catch((err) => {
    console.log(err);
  });
