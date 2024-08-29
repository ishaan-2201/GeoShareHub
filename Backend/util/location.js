const API_KEY="AIzaSyCDqMac0v8EgoI0ldkYhnc60W36X_8M9sE"
const axios=require("axios")
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