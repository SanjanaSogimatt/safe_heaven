const mongoose=require('mongoose')
const Schema=mongoose.Schema
const neighbourhoodSchema=new Schema({
    name:String,
    place:String,
    title:String,
    date:String,
    description:String,
    location:String,
    message:String
})
module.exports=mongoose.model('Incident',neighbourhoodSchema)