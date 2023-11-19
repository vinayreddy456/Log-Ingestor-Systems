import express from 'express'
import Log from '../models/log-format.js'


export const logpostc=async (req,res)=>{
    try{
        const newlog=new Log({
           ...req.body
        })
         const logData=await newlog.save()
         res.status(200).json(logData)
    }
    catch(error){
        res.status(500).json(error)
    }
}
