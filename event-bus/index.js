const express=require('express')
const cors=require('cors')
const app =express()
const axios=require('axios')


 
app.use(express.json())
app.use(cors({limit:'50mb'}))    

const events=[];


app.post('/events',(req,res)=>{
    console.log("eventssssssssss",req.body);
    const event=req.body  

    events.push(event);

    axios.post('http://posts-clusterip-srv:4000/events',event)
    axios.post('http://comments-clusterip-srv:4001/events',event)
    axios.post('http://query-srv:4002/events',event)
    axios.post('http://moderation-srv:4003/events',event)

    res.send({status:"ok"})  

})

app.get('/events',(req,res)=>{
    res.send(events)
})

app.listen(4005,()=>{
    console.log("listengin of 4005");
})