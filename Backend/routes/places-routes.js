const express = require('express')
const router = express.Router()
const {check}=require('express-validator')
const HttpError = require('../models/http-error')
const placesControllers = require('../controllers/places-controllers')

router.get('/:id', placesControllers.getPlaceById);

router.get('/user/:id', placesControllers.getPlacesByUserID);

router.post('/', [check('title').not().isEmpty(),check('description').isLength({min: 5}),check('adress').not().isEmpty()] ,placesControllers.createPlace)

router.patch('/:id',  [check('title').not().isEmpty(),check('description').isLength({min: 5})] ,placesControllers.updatePlace)
router.delete('/:id',placesControllers.deletePlace)

module.exports = router