const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Trip = sequelize.define('Trip', {
    id_trip: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
  from_: { type: DataTypes.STRING, allowNull: false },
  to_: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  start_date: { type: DataTypes.STRING, allowNull: false },
  end_date: { type: DataTypes.STRING, allowNull: true },
},{
    tableName: 'trips',
  });

module.exports = Trip;
