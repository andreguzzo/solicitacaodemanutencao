// models/User.js
import { DataTypes } from 'sequelize';
import db from '../db.js';
import Ticket from './Ticket.js';

const User = db.define('User', {
  // Defina os campos do modelo aqui
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
});



export default User;
