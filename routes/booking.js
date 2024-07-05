const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

router.post('/add/:user_id/:trip_id',async(req,res)=>{
    
    try{
        const { user_id, trip_id } = req.params;
        const booking=await Booking.create({user_id:parseInt(user_id),trip_id:parseInt(trip_id)})
        res.json(booking)

    }catch(error){
    console.log("🚀 ~ router.post ~ error:", error)

    }
})


 module.exports= router;