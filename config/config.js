const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().required().description('App environment is needed'),
    PORT: Joi.number().default(3001),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ALGO: Joi.string().required().description('JWT Algorithm'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    DB_HOST: Joi.string().description('Database host'),
    DB_PORT: Joi.number().default(8889).description('Database port'),
    DB_DATABASE: Joi.string().description('Database name'),
    DB_USERNAME: Joi.string().description('Database username'),
    DB_PASSWORD: Joi.string().description('Database password'),
    DB_DIALECT: Joi.string().description('Database dialect'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    jwtAlgorithm: envVars.JWT_ALGO,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  database: {
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    name: envVars.DB_DATABASE,
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    dialect: envVars.DB_DIALECT,
  },

  //   email: {
  //     smtp: {
  //       host: envVars.SMTP_HOST,
  //       port: envVars.SMTP_PORT,
  //       auth: {
  //         user: envVars.SMTP_USERNAME,
  //         pass: envVars.SMTP_PASSWORD,
  //       },
  //     },
  //     from: envVars.EMAIL_FROM,
  //   },
};
