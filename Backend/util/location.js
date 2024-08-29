const axios=require("axios")
require("dotenv").config()
const API_KEY = process.env.API_KEY
const HttpError = require("../models/http-error")

async function getCoordinates(address){
  const response= await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`)
  const data=response.data
  if(!data || data.status==="ZERO_RESULTS"){
    throw new HttpError("Could not find a place with the provided address",422);
  }
  const coordinates=data.results[0].geometry.location
  return coordinates
}

module.exports=getCoordinates