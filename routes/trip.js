const express = require('express');
const router = express.Router();
const Trip = require('../models/trip');



router.post('/add',async(req,res)=>{
    try{
        // console.log("🚀 ~ router.post ~ from_, to_,price,start_date,_end_date:", from_, to_,price,start_date,_end_date)
        console.log("🚀 ~ router.post ~ req.body:", req.body)
        let { from_, to_,price,start_date,end_date}=req.body

        
        const trip = await Trip.create({ from_, to_,price,start_date,end_date});
        res.json(trip)

    }catch(error){
        console.log("🚀 ~ router.post ~ error:", error)
    
    }
})




module.exports= router;