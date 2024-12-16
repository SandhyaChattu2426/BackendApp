const { v4: uuid } = require('uuid')
const HttpError = require('../models/http-error')
const { validationResult } = require('express-validator')
const UserS = require('../models/user')



const DUMMY_Users = [{
    id: "u1",
    name: "Sandhya Chattu",
    email: "sandhyachattu@gmail.com",
    password: "Sandy143&&"
}]


const getUsers = async (req, res, next) => {
    let users

    try{
        users=await UserS.find({},'-password');
    }
    catch(err){
        const error=new HttpError('Fetching users failed,please try again later')
        return next(error)
    }
    res.json({users:users.map(e=>e.toObject({getters:true}))})

}


// SIGN UP

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     console.log(errors)
    //     return next(new HttpError('Invalid inputs passed,please check your data.', 422))
    // }
    const { name, email, password,  } = req.body
    console.log(name, email, password,)
    let existingUser
    try {
        existingUser = await UserS.findOne({ email: email })
    }
    catch (e) {
        s
        const err = new HttpError("Signup failed, please try Again", 500)
        return next(err)
    }
    if (existingUser) {
        const err = new HttpError("user already exists", 500)
        return next(err)
    }
    const new_user = new UserS({
        name,
        email,
        image: "https://res.cloudinary.com/dr9thittl/image/upload/v1730971844/PatientImage_vmi3fo.jpg",
        password,
        places:[]
    })
    try {
        await new_user.save()
    }

    catch (e){
        console.log(e)
        const error = new HttpError("Can not created Place please check inputFields", 500)
        return next(error)
    }
    res.status(201).json({ user: new_user })
}


//lOGIN

    const login = async (req, res, next) => {
    const { email, password } = req.body
    // const identifiedUser = DUMMY_Users.find(u => u.email === email);
    // console.log(email, password)
    let existingUser;
    try {
        existingUser = await UserS.findOne({ email: email })

        // console.log(existingUser)
    }
    catch (e) {
        const err = new HttpError("Logging in failed,please try again later.", 500)
        return next(err)
    }
    console.log(existingUser && existingUser.password == password)
    if (!existingUser || existingUser.pasword == password) {
        const error = new HttpError('Invalid credentials,could not log you in', 401)
    return next(error)
  
    }
    return res.json({ msg: "Logged In" })

}
exports.getUsers = getUsers
exports.signup = signup
exports.login = login