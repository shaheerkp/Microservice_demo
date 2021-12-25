const express= require('express')
const app =express()
const cors=require('cors')
const {randomBytes}=require('crypto')
const axios=require('axios') 

app.use(express.json({limit:'50mb'}))
app.use(cors())

const commentsByPostId={}

app.get("/posts/:id/comments",(req,res)=>{
    console.log("getssss");
    res.send(commentsByPostId[req.params.id]||[])

})

app.post("/posts/:id/comments",(req,res)=>{
    console.log("postssss");
    const commentId=randomBytes(4).toString("hex")
    const{content}=req.body
    const comments=commentsByPostId[req.params.id]||[]
    comments.push({id:req.params.id,content})   
    commentsByPostId[req.params.id]=comments
    axios.post("htpp://localhost:4005/events",{
        type:'Comment created',
        data:{
            id:commentId, 
            content,
            postId:req.params.id
        } 
    })
    res.status(201).send(commentsByPostId) 

})

app.post('/events',(req,res)=>{
    console.log("Recieved Events ",req.body.type);
    res.send({})
})


app.listen(4001,()=>{
    console.log("Listening to port 4001");
})