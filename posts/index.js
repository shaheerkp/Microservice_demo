const express = require('express')
const {randomBytes}=require('crypto')
const cors=require('cors')
const axios=require('axios')

 
const app = express()

app.use(express.json())
app.use(cors({limit:'50mb'}))    
 
const posts={};


app.get('/posts',(req,res)=>{
    console.log("posts");
 res.send(posts)
}) 

app.post('/posts',async(req,res)=>{ 
    const id =randomBytes(4).toString('hex') 
   
    const {title}=req.body
    posts[id]={
        id,title
    };
   await axios.post('http://event-bus-srv:4005/events',{
        type:"PostedCreated",
        data:{
            id,
            title
        }
    }) 
    res.status(201).send(posts[id])

})

app.post('/events',(req,res)=>{ 
    console.log("Recieved Events ",req.body);
    res.send({})
})



app.listen(4000,()=>{
    console.log("v20");
    console.log("Listening on 4000");
})