// sequelize.js
import { Sequelize } from 'sequelize';
import 'dotenv/config'
import mysql2 from 'mysql2'

console.log(process.env.DB+"DB")
const db = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {dialect: 'mysql',dialectModule: mysql2, host: process.env.DB_HOST});

export default db;
