const express=require('express')
const cors=require('cors')

const app=express()

app.use(cors())
app.use(express.json())

app.get('/posts',(req,res)=>{
    res.send(posts)

})

const posts={}

app.post('/events',(req,res)=>{
    const{type,data}=req.body

    if(type==="PostCreated"){
        const{id,title}=data
        posts[id]={id,title,comments:[]}

    }
    if(type==="CommentedCreated"){
        const{id,content,postId}=data;
        const post=posts[postId]
        post.comments.push({id,content})

    }
    console.log("______________________",posts);
    res.send({})

}) 

app.listen(4002,()=>{
    console.log("Listening to 4002");
})