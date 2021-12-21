const express = require('express');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.post('/register', validate(userValidation.register), userController.register);
router.post('/login', validate(userValidation.login), userController.login);
router.patch('/update/:id', isAuth, userController.updateUser);
router.delete('/delete/:id', isAuth, userController.deleteUser);

module.exports = router;
