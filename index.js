const express = require('express');
const app = express();
const userRoute =require('./routes/user')//importation de route
const tripRoute =require('./routes/trip')
const bookingRoute =require('./routes/booking')

const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());




app.use('/user',userRoute); //utilisation de route
app.use('/trip',tripRoute);
app.use('/booking',bookingRoute);
app.use('/getimage',express.static('./uploads'))

const port = process.env.PORT || 3100;


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });

