const {v4:uuid}=require('uuid')
const HttpError = require('../models/http-error')
const {validationResult}=require('express-validator')



const DUMMY_Users=[{
    id:"u1",
    name:"Sandhya Chattu",
    email:"sandhyachattu@gmail.com",
    password:"Sandy143&&"
}]


const getUsers=(req,res,next)=>{
    res.json({users:DUMMY_Users})

}

const signup=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors)
        throw new HttpError('Invalid inputs passed,please check your data.',422)
    }
        const{name,email,password}=req.body

        const had_user=DUMMY_Users.find(u=>u.email===email)
        if(had_user){
            throw new HttpError("user Already Exists",404)
        }
        const new_user={
            id:uuid(),
            name,
            email,
            password
        };
        DUMMY_Users.push(new_user)
        res.status(201).json({user:new_user})
}

const login=(req,res,next)=>{
    const {email,password}=req.body
    const identifiedUser=DUMMY_Users.find(u=>u.email===email);
    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError("Could not identify user,credentials seem to be wrong.",401)
    }
    res.json({message:'Logged in!'})

}

exports.getUsers=getUsers
exports.signup=signup
exports.login=login