const express = require("express");
const userRoute = express.Router();
const {connection} = require("../config/connection")

userRoute.post("/add",(req,res)=>{
        const {id, name, email, phone, website, city, company } = req.body;
        const sql = `INSERT INTO users (id, name, email, phone, website, city, company) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        connection.query(sql, [id, name, email, phone, website, city, company], (err, result) => {
          if (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Error creating user' });
            return;
          }
          console.log(result)
          res.status(201).json({ message: 'User created successfully', userId: id });
        
        });
      
})

module.exports = {userRoute}