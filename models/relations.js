// models/index.js
const sequelize = require('../config/database');
const User = require('./user');
const Trip = require('./trip');
const Booking = require('./booking');

// Définir les relations
User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

Trip.hasMany(Booking, { foreignKey: 'trip_id' });
Booking.belongsTo(Trip, { foreignKey: 'trip_id' });

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Unable to sync database:", error);
  }
};

module.exports = {
  User,
  Trip,
  Booking,
  syncDatabase
};
