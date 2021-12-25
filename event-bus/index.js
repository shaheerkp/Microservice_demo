const express=require('express')
const cors=require('cors')
const app =express()
const axios=require('axios')


app.use(express.json())
app.use(cors())

app.post('/events',(req,res)=>{
    console.log("eventssssssssss",req.body);
    const event=req.body  
    axios.post('http://localhost:4000/events',event)
    axios.post('http://localhost:4001/events',event)
    axios.post('http://localhost:4002/events',event)

    res.send({status:"ok"})  
 
 

})

app.listen(4005,()=>{
    console.log("listengin of 4005");
})