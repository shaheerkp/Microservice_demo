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

    comments.push({id:req.params.id,content,status:'pending'})   

    commentsByPostId[req.params.id]=comments
    axios.post("htpp://event-bus-srv:4005/events",{
        type:'Comment created',
        data:{
            id:commentId, 
            content,
            postId:req.params.id,
            status:"pending"
        } 
    })
    res.status(201).send(commentsByPostId) 

})

app.post('/events',async(req,res)=>{
    console.log("Recieved Events ",req.body.type);
    const {type,data}=req.body;
    if(type==='CommentModerated'){
        const {postId,id,status,content}=data;

        const comments=commentsByPostId[postId];

        const comment=comments.find(comment=>{
            return comment.id===id;
        });
        comment.status=status;
        await axios.post('http://event-bus-srv:4005',{
            type:"CommentUpdated",
            data:{
                id,
                status,
                postId,
                content
            }
        })

    }
    res.send({})
})


app.listen(4001,()=>{
    console.log("Listening to port 4001");
})