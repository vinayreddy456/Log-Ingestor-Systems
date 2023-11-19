import express from 'express'
import {config} from 'dotenv'
import mongoose from 'mongoose'
import logpost from './routes/log-post.js';
import logsearch from './routes/log-search.js';
config()
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api',logsearch);
app.use('/post',logpost);
const connect= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connected");
    }
    catch(error){
        console.log(error);
    }
}
app.listen(process.env.PORT,()=>{
    connect();
    console.log("Listening on port 3000")
})