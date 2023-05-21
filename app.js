const express=require('express')
const app=express()
const methodOverride=require('method-override')
const path=require('path')
const mongoose=require('mongoose')
const Incident=require('./models/neighbourhood')
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb://localhost:27017/neighbourhood',{
    useNewUrlParser:true,
    //useCreateIndex:true,
    useUnifiedTopology:true
})
const db=mongoose.connection
db.on("error",console.error.bind(console,"connection error:"))
db.once("open",()=>{
    console.log("Database connected")
})
app.use(methodOverride('_method'))

app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/community',async(req,res)=>{
    const incidents=await Incident.find({})
    res.render('incident/index',{incidents})
})
app.get('/community/new',(req,res)=>{
    res.render('incident/new')
})
app.get('/community/safety',(req,res)=>{
    res.render('incident/safety')
})
app.post('/community',async(req,res)=>{
    const incident=new Incident(req.body.incident)
    await incident.save()
    res.redirect(`/community/${incident._id}`)
})
app.get('/community/:id',async(req,res)=>{
    const incident=await Incident.findById(req.params.id)
    res.render('incident/show',{incident})
})
app.get('/community/:id/edit', async(req,res)=>{
    const incident=await Incident.findById(req.params.id)
    res.render('incident/edit',{incident})
})
app.put('/community/:id',async(req,res)=>{
    const {id}=req.params
    const incident=await Incident.findByIdAndUpdate(id,{...req.body.incident})
    res.redirect(`/community/${incident._id}`)
})
app.delete("/community/:id",async (req,res)=>{
    const {id}=req.params
    await Incident.findByIdAndDelete(id)
    res.redirect(`/community`)
})

app.listen(3000,()=>{
    console.log("Server on port 3000")
})