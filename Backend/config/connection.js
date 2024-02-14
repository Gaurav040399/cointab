const mysql = require('mysql');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Gaurav@123',
  database: 'user_database'
};

// Create a MySQL connection
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password
});



module.exports = {connection, dbConfig}