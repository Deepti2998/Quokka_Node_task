require('dotenv/config');
const express = require('express');
const router = express.Router();
const apiSchema = require("../apiSchema/userSchema")
const joiValidation = require("../middlewares/joi")
const auth = require("../middlewares/auth");
const userService = require('../controllers/userAuth')
const models = require('../models');


router.post('/login',joiValidation.validateBody(apiSchema.loginSchema),  userService.login);
router.post('/signUp', userService.signup);
router.get('/get-profile', auth.validateToken, userService.getUserProfile);





module.exports = router;