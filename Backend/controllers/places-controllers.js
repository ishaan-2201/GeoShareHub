const HttpError=require("../models/http-error")
const { v4: uuidv4 } = require('uuid');
const {validationResult}=require("express-validator")

let DUMMY_PLACES=[
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://th.bing.com/th?id=OIF.%2f2HSK2Gkl%2fUHPbUW%2fGKvxw&rs=1&pid=ImgDetMain',
        address: '20 W 34th St, New York, NY 10118, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9878531
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Taj Mahal',
           description: 'One of the most beautiful buildings in the world!',
           imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Taj_Mahal_2012.jpg',
           address: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India',
           location: {
               lat: 27.1751448,
               lng: 78.0421422
           },
           creator: 'u1'
   }
]

const getPlaceById=(req,res,next)=>{
    const {placeId}=req.params
    const place=DUMMY_PLACES.find(place=> place.id===placeId);
    if(!place){
        throw new HttpError("Could not find a place with the provided id.",404)
    }
    res.json({place})
}

const  getPlacesByUserId=(req,res,next)=>{
    const {userId}=req.params;
    const places=DUMMY_PLACES.filter(place => place.creator===userId);
    if(!places || places.length===0){
       return next(new HttpError("Could not find any place with the provided user id.",404))
   }
    res.json({places})
}

const createPlace=async (req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        next(new HttpError("Invalid inputs, please check your input values.",422));
    }
    const {title,description,address,coordinates,creator} = req.body;
    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        address,
        location:coordinates,
        creator
    }
    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({place:createdPlace})

}

const updatePlace=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError("Invalid inputs, please check your input values.",422)
    }
    const {placeId}=req.params
    const {title,description}=req.body
    const place={...DUMMY_PLACES.find(place=> place.id===placeId)};
    const placeIndex=DUMMY_PLACES.findIndex(place => place.address.id === placeId)
    place.title=title
    place.description=description
    DUMMY_PLACES[placeIndex]=place
    res.status(200).json({updatedPlace: place})
}

const deletePlace=(req,res,next)=>{
     const {placeId}=req.params
     const deletedPlace=DUMMY_PLACES.find(place => place.id===placeId)
     const updatedDummyPlaces = DUMMY_PLACES.filter(place => place.id !== placeId)
     DUMMY_PLACES=updatedDummyPlaces
     res.status(200).json({deletedPlace: deletedPlace})
}

exports.getPlaceById=getPlaceById
exports.getPlacesByUserId=getPlacesByUserId
exports.createPlace=createPlace
exports.updatePlace=updatePlace
exports.deletePlace=deletePlace