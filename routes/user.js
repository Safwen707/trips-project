const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Booking = require('../models/booking');
const bcrypt = require('bcrypt');
const multer= require('multer');
const sequelize = require('../sync');
const cloudinary = require('cloudinary').v2;
const upload = require('../config/multer-config');
const fs = require('fs');
const path = require('path');


// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  }); 
 


  router.post('/register',upload.single('image'), async (req, res) => {
    try {
      let {name, email, password } = req.body
      const user = await User.findOne({ where: { email } });
      if (user) {
        res.status(404).json({ message: 'User exist' });
    } else {
        const uploadsDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }


        // Write buffer to a temporary file
        const tempFilePath = path.join(uploadsDir, `${Date.now()}-${req.file.originalname}`);
        
        fs.writeFile(tempFilePath, req.file.buffer, async (err) => {
            if (err) {
            return res.status(500).json({ message: 'Failed to save file', error: err.message });
            }})

        console.log("🚀 ~ router.post ~ req.file:", req.file)
          const result = await cloudinary.uploader.upload(tempFilePath , {
            folder:'folder_name'
           });
           salt=bcrypt.genSaltSync(10);
           //generate random string pour hasher pwd
           cryptedPass = await bcrypt.hashSync(password,salt)  ;
           //creation de user
           const user = await User.create({ name, email,password:cryptedPass ,image:result.url});
           console.log("🚀 ~ router.post ~ imageUrl:", result.secure_url)
           console.log("🚀 ~ router.post ~ user:", user)
           console.log("fin user")
           res.status(201).json(user);
           // Supprimer le répertoire uploads (après son utilisation)
        fs.rmdir(uploadsDir, { recursive: true }, (err) => {
            if (err) {
                console.error(`Erreur lors de la suppression du répertoire uploads: ${err}`);
                return;
            }
            console.log(`Répertoire uploads supprimé avec succès.`);
});
    }
     
    } catch (error) {
      console.log("🚀 ~ router.post ~ error:", error)
      res.status(500).json({ error: error.message });
    }
  });




router.get('/getUsersBooking',async(req,res)=>{
    try{
        const query=`SELECT * 
        FROM users  ,bookings   
        WHERE id_user = user_id`
         
        const rows = await sequelize.query(query, {
                          
                          type: sequelize.QueryTypes.SELECT
        });
        console.log("🚀 ~ router.get ~ rows:", rows)
        res.json(rows)


    }catch(err){
        console.log("🚀 ~ router.get ~ err:", err)
        
    }
})





module.exports= router;