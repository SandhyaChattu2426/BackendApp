const HttpError = require('../models/http-error')

const { v4: uuid } = require("uuid")
const { validationResult } = require('express-validator')
const Place = require('../models/place')


let DUMMY_PLACES = [{
    id: 'p1',
    title: "Empire State Building",
    description: "One of the most fampus sky scrapers in the world!",
    location: {
        lat: 40.7484474,
        lng: -42.752
    },
    adress: "20 w 34thst,new York,NY 10001",
    creator: 'u1'
},
{
    id: 'p1',
    title: "Empire State Building",
    description: "One of the most fampus sky scrapers in the world!",
    location: {
        lat: 40.7484474,
        lng: -42.752
    },
    adress: "20 w 34thst,new York,NY 10001",
    creator: 'u1'
},
]

const getPlaceById = async (req, res, next) => {
    console.log('GET Request in Places')
    const placeId = req.params.id
    let place;
    // const place = DUMMY_PLACES.find(p => p.id == placeId)

    try {
        place = await Place.findById(placeId)
    }
    catch (err) {
        const error = new HttpError("Couldnot find the place Having the Provided Id", 500)
        return next(error)
    }
    if (!place) {
        const error = new HttpError('Could not find a place for the Provided id.', 404)
        return next(error)

    }

    res.json({ place: place.toObject({ getters: true }) })
}

//GET PLACES BY USER ID
const getPlacesByUserID = async (req, res, next) => {
    const userId = req.params.id
    console.log(userId)
    //const createdBy = DUMMY_PLACES.filter(p => p.creator === userId)
    //const Created=Place.findById()
    let places
    try {
         places =await mongoose.find({creator:userId})
    } catch (err) {
        const error = new HttpError("not getting a place by given creator id", 402)
        return next(error)
    }
    if (!createdBy || createdBy.length === 0) {
        // const error = new Error('Could not find a place for the Provided id.')
        // error.code = 404
        return next(new HttpError('Could not find a place for the Provided id.', 404));
    }
    res.json({ places:places.map(e=>e.toObject({getters:true})) })
};

//CREATING PLACE
const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        throw new HttpError('Invalid inputs passed,please check your data.', 422)
    }

    const { title, description, coordinates, adress, creator } = req.body;
    const createdPlace = new Place({

        title,
        description,
        location: coordinates,
        adress,
        image: "https://res.cloudinary.com/dr9thittl/image/upload/v1730971844/PatientImage_vmi3fo.jpg",
        creator,
    });

    //DUMMY_PLACES.push(createPlace)
    try {
        await createdPlace.save()
    }
    //console.log(createPlace)
    catch {
        const error = new HttpError("Can not created Place please check inputFields", 500)
        console.log(error)
        return next(error)
    }
    res.status(201)
    res.json({ place: createdPlace })
}


// UPDATE PLACE
const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors)
        throw new HttpError('Invalid inputs passed,please check your data.', 422)
    }
    const { title, description } = req.body;
    const placeId = req.params.id
    // const updatedPLace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
    console.log(placeId)
    let place;
    try{
      place=await Place.findById(placeIdyhn )
      console.log(place)
   }
    catch(err){
        const error= new HttpError("Can not find a place by provided place id",500)
        console.log({err})
        return next(error)
    }

    //const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    place.title = title;
    place.description = description;
    try{
        await place.save()
    }
    catch(err){
        const error=new HttpError("couldnt Updated",500)
        return next(error)
    }

    res.status(200).json({ place: place.toObject({getters:true}) })
}

//DELETE PLACE
const deletePlace = async (req, res, next) => {
    const placeId = req.params.id
    
    //console.log(DUMMY_PLACES)
    let place;
    try{
     place=await Place.findById(placeId)
    }
    catch(e){
        const error=new HttpError("Coundn't find the place with the fallowing Id",500)
        next(error)
    }
    try{
        await place.remove()
    }   catch(e){
        const error=new HttpError("Coundn't find the place with the fallowing Id",500)
        next(error)
    }

    res.status(200).json(({place:"Deleted Place"}))
}


exports.getPlaceById = getPlaceById
exports.getPlacesByUserID = getPlacesByUserID
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace