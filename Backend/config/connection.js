const { config } = require('dotenv');
const mysql = require('mysql');
require("dotenv"),config();

const dbConfig = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
};

// Create a MySQL connection
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password
});



module.exports = {connection, dbConfig}