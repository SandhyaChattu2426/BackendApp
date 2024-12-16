const express = require('express')
const router = express.Router()
const {check}=require("express-validator")
const HttpError = require('../models/http-error')
const userController = require("../controllers/user-controllers")

router.get('/', userController.getUsers);

router.post('/signup',[check('name').not().isEmpty(),check('email').normalizeEmail().isEmail(),check("password").isLength({min:6})] ,userController.signup)
router.post('/login',userController.login)



module.exports = router