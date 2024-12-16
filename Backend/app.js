const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const placesRoutes = require('./routes/places-routes')
const HttpError=require("./models/http-error")
const usersRoutes=require("./routes/users-routes")
const mongoose=require("mongoose")
app.use(bodyParser.json())

app.use('/api/places', placesRoutes);
app.use('/api/users',usersRoutes)

app.use((req,res,next)=>{
    const error=new HttpError('Could not find this route .',404)
throw error

});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An Unknown error occured' })
})

app.get("/")
mongoose.connect(`mongodb+srv://sandhyachattu:123@cluster0.shxq2.mongodb.net/SampleNodeApp?retryWrites=true&w=majority&appName=Cluster0`).then(app.listen(5000, () => {
    console.log("server is running at 5000")
    console.log("connected to mogodb")
})).catch(err=>console.log(err))
