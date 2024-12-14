const {v4:uuid}=require('uuid')
const HttpError = require('../models/http-error')
const {validationResult}=require('express-validator')
const UserS=require('../models/user')



const DUMMY_Users=[{
    id:"u1",
    name:"Sandhya Chattu",
    email:"sandhyachattu@gmail.com",
    password:"Sandy143&&"
}]


const getUsers=(req,res,next)=>{
    res.json({users:DUMMY_Users})

}

// SIGN UP

const signup=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors)
        throw new HttpError('Invalid inputs passed,please check your data.',422)
    }
        const{name,email,password}=req.body
        let existingUser
        try{
         existingUser= await UserS.findOne({email:email})
        }
        catch(e){
            const err=new HttpError("Signup failed, please try Again",500)
            next(err)
        }
        if(existingUser){
            const err=new HttpError(" user already exists",500)
            return next(err)
        }
       const new_user=new Users({
        name,
        email,
        image:"https://res.cloudinary.com/dr9thittl/image/upload/v1730971844/PatientImage_vmi3fo.jpg",
        password,
       })
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