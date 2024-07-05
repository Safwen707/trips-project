// models/booking.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Trip = require('./trip');

const Booking = sequelize.define('Booking', {
  booking_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id_user' } },
  trip_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Trip, key: 'id_trip' } },
},{
    tableName: 'bookings',
  });

module.exports = Booking;
