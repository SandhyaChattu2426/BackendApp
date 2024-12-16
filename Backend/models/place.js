const mongoose=require('mongoose')
const Schema=mongoose.Schema

const placeSchema=new Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    image:{type:String, required:true},
    adress:{type:String, required:true},
    location:{lat:{type:Number},lng:{type:Number}},
    creator:{type:mongoose.Types.ObjectId, required:true, ref:'user'}
})

module.exports=mongoose.model('places',placeSchema)