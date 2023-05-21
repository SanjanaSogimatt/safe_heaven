const mongoose=require('mongoose')

const incident=require('./models/neighbourhood')
mongoose.connect('mongodb://localhost:27017/neighbourhood')
.then(()=>{
    console.log("Connection open")
})
.catch(err =>{
    console.log('Oh no error')
})
const i=new incident({
    name:'Alice',
    place:'bengaluru',
    title:'robbary',
    description:'robbary',
    location:'bengaluru',
    message:'stay safe'
})
i.save().then(i=>{
    console.log(i)
})
.catch(e=>{
    console.log("ERROR")
})