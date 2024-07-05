// sync.js

const sequelize = require('./config/db');
const User = require('./models/user');
const Trip = require('./models/trip');
const Booking = require('./models/booking');



// Synchronisation de la base de données
sequelize.sync({ alter: true }).then(() => {
  console.log("Base de données et tables créées !");
}).catch(err => {
  console.error("Erreur lors de la synchronisation de la base de données :", err);
});

module.exports = sequelize; // Exportez sequelize si nécessaire

