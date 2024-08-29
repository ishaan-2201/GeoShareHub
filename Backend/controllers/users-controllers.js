const HttpError=require("../models/http-error")
const { v4: uuidv4 } = require('uuid');
const {validationResult}=require("express-validator")

const DUMMY_USERS =[
    {
        id:"u1",
        name:"Ishaan",
        email: "ishaanpuri2201@gmail.com",
        password: "Msdhoni@7"
    }
]

const getUsers=(req,res,next)=>{
    res.json({users: DUMMY_USERS})
}

const signup=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError("Invalid inputs, please check your input values",422)
    }
    const {name,email,password}=req.body
    const isUserPresent=DUMMY_USERS.find(user => user.email===email)
    if(isUserPresent){
        throw new HttpError("Could not create user, email already exists.",422)
    }
    const createdUser= {
        id: uuidv4(),
        name,
        email,
        password
    }
    DUMMY_USERS.push(createdUser)
    res.status(201).json({createdUser: createdUser})
}


const login=(req,res,next)=>{
    const {email,password}=req.body
    const foundUser=DUMMY_USERS.find(user => user.email===email)
    if(!foundUser || foundUser.password!==password){
        throw new HttpError("Could not find a user with those credentials!",401)
    }
    res.json({message: `${foundUser.name}, you are successfully logged in.`})
}

exports.getUsers=getUsers
exports.signup=signup
exports.login=login