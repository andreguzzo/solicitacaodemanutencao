// models/User.js
import { DataTypes } from 'sequelize';
import db from '../db.js';
import User from './User.js'

const Ticket = db.define('Ticket', {
  // Defina os campos do modelo aqui
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  photo: {
    type: DataTypes.TEXT('long'), // Armazenar base64 como texto longo
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'aguardando',
  },
  urgency: {
    type: DataTypes.ENUM('baixa', 'média', 'alta'),
    allowNull: false,
  },
  deadlineDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
},
  userID : {
    type: DataTypes.INTEGER,
}});

//Ticket.belongsTo(User, { foreignKey: 'userId' });


export default Ticket;

