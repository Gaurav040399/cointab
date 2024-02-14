const {connection, dbConfig} = require("../config/connection");

const userSchema = () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(40),
        website VARCHAR(255),
        city VARCHAR(100),
        company VARCHAR(255)
      )
    `;
  
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error creating users table:', err);
        return;
      }
      console.log('Users table created successfully');
    });
  };

  module.exports = {userSchema}