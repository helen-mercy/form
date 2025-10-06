const express = require('express')
const mongoose= require('mongoose')
const path =require('path')
const port = 3019

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/form')
const db=mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection successfull")
})

const userSchema =new mongoose.Schema({
    name:String,
    feeling:String,
    stress:String,
    exam:String,
    assignments:String
})

const Users=mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'forms.html'))
})

app.post('/post',async(req,res)=>{
    const{name,feeling,stress,exam,assignments} =req.body
    const user=new Users({
        name, 
        feeling,
        stress,
        exam,
        assignments
    })
    await user.save()
    console.log(user)
    res.send("🎉 Form submitted successfully!🎉")
})
app.listen(port,()=>{
    console.log("Server started")
})