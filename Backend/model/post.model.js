const {connection, dbConfig} = require("../config/connection");

const postSchema = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      title VARCHAR(255) NOT NULL,
      body TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;
  
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error creating users table:', err);
        return;
      }
      console.log('Post table created successfully');
    });
  };

  module.exports = {postSchema}