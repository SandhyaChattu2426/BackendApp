const HttpError = require('../models/http-error')

const { v4: uuid } = require("uuid")
const {validationResult}=require('express-validator')


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

const getPlaceById = (req, res, next) => {
    console.log('GET Request in Places')
    const placeId = req.params.id
    // console.log(placeId)
    const place = DUMMY_PLACES.find(p => p.id == placeId)
    // console.log(placeId) 
    if (!place) {
        const error = new HttpError('Could not find a place for the Provided id.', 404)
        error.code = 404
        throw error;

    }
    res.send(place)
    //  res.json({place})
}

const getPlacesByUserID = (req, res, next) => {
    const userId = req.params.id
    
    const createdBy = DUMMY_PLACES.filter(p => p.creator === userId)
    if (!createdBy || createdBy.length===0) {
        // const error = new Error('Could not find a place for the Provided id.')
        // error.code = 404
        return next(new HttpError('Could not find a place for the Provided id.', 404));
    }
    res.json({places:createdBy})

};

const createPlace = (req, res, next) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors)
        throw new HttpError('Invalid inputs passed,please check your data.',422)
    }

    const { title, description, coordinates, adress, creator } = req.body;
    const createdPlace = {
        id:uuid(),
        title,
        description,
        location: coordinates,
        adress,
        creator
    }
    DUMMY_PLACES.push(createPlace)
    console.log(createPlace)
    res.status(201)
    res.json({ place: createdPlace })
}

const updatePlace=(req,res,next)=>{
    const errors=validationResult(req);
    
    if(!errors.isEmpty()){
        console.log(errors)
        throw new HttpError('Invalid inputs passed,please check your data.',422)
    }
    const { title, description } = req.body;
    const placeId=req.params.id
    const updatedPLace={...DUMMY_PLACES.find(p=>p.id===placeId)};
    const placeIndex=DUMMY_PLACES.findIndex(p=>p.id===placeId);
    updatedPLace.title=title;
    updatedPLace.description=description
    DUMMY_PLACES[placeIndex]=updatedPLace;
    res.status(200).json({place: updatedPLace})
}

const deletePlace=(req,res,next)=>{
    const placeId=req.params.id
    DUMMY_PLACES.filter(p=>p.id !== placeId)
    console.log(DUMMY_PLACES)
    res.status(200).json({message:"Place Deleted"})
}


exports.getPlaceById = getPlaceById
exports.getPlacesByUserID = getPlacesByUserID
exports.createPlace = createPlace
exports.updatePlace=updatePlace
exports.deletePlace=deletePlace