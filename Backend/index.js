const express = require("express");
const cors = require("cors")
const { connection ,dbConfig} = require("./config/connection");
const { userSchema } = require("./model/user.model");
const { postSchema } = require("./model/post.model");
const { userRoute } = require("./route/user.route");
const { postRoute } = require("./route/post.route");


require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000 ;

app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/posts", postRoute)

app.listen(PORT , async () =>{
     try {
      connection.connect((err) => {
        if (err) {
          console.error('Error connecting to MySQL server:', err);
          return;
        }
        console.log('Connected to MySQL server');
      
        // Create the database if it doesn't exist
        connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`, (err, result) => {
          if (err) {
            console.error('Error creating database:', err);
            return;
          }
          console.log('Database created successfully');
          // After creating the database, switch to using it
          connection.query(`USE ${dbConfig.database}`, (err) => {
            if (err) {
              console.error('Error switching to database:', err);
              return;
            }
            console.log('Using database:', dbConfig.database);
            // Now create tables
            userSchema();
            postSchema()
          });
        });
      });
          console.log(`Server is running on port ${PORT}`);
     } catch (error) {
        console.log('Cannot Connected to MySQL database');
        console.log(error);
     }
    
})