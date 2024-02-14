const express = require("express");
const postRoute = express.Router();
const axios = require("axios");
const ExcelJS = require('exceljs');
const {connection} = require("../config/connection")

// Define a route to handle bulk addition of posts
postRoute.post('/bulk-add-posts', (req, res) => {
    // Fetch users from the database
    connection.query('SELECT * FROM users', (err, users) => {
      if (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Error fetching users' });
        return;
      }
  
      // Iterate through each user
      Promise.all(users.map(user => {
        // Fetch posts for each user from the JSONPlaceholder API
        return new Promise((resolve, reject) => {
          const userId = user.id;
          const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
          // Make HTTP request to fetch posts
          axios.get(url)
            .then(response => {
              // Insert posts into the database
              const posts = response.data;
              const values = posts.map(post => [userId, post.title, post.body]);
              const sql = 'INSERT INTO posts (user_id, title, body) VALUES ?';
              connection.query(sql, [values], (err, result) => {
                if (err) {
                  console.error(`Error inserting posts for user ${userId}:`, err);
                  reject(err);
                  return;
                }
                console.log(`Bulk added posts for user ${userId}`);
                resolve();
              });
            })
            .catch(error => {
              console.error(`Error fetching posts for user ${userId}:`, error);
              reject(error);
            });
        });
      }))
      .then(() => {
        res.json({ message: 'Bulk addition of posts successful' });
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error bulk adding posts' });
      });
    });
  });
  

// Function to fetch users and their posts
const fetchUsersWithPosts = () => {
    return new Promise((resolve, reject) => {
      // Query the database to get all users
      connection.query('SELECT * FROM users', (err, users) => {
        if (err) {
          console.error('Error fetching users:', err);
          reject(err);
          return;
        }
  
        // Iterate through each user
        Promise.all(users.map(user => {
          // Fetch posts for each user from the JSONPlaceholder API
          return new Promise((resolve, reject) => {
            const userId = user.id;
            const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
            // Make HTTP request to fetch posts
            axios.get(url)
              .then(response => {
                // Add posts to the user object
                user.posts = response.data;
                resolve(user);
              })
              .catch(error => {
                console.error(`Error fetching posts for user ${userId}:`, error);
                reject(error);
              });
          });
        }))
        .then(usersWithPosts => {
          resolve(usersWithPosts);
        })
        .catch(error => {
          reject(error);
        });
      });
    });
  };
  
  // Define a route to fetch users and their posts and download in Excel
  postRoute.get('/download-excel', (req, res) => {
    fetchUsersWithPosts()
      .then(usersWithPosts => {
        // Create a new Excel workbook and sheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Users');
  
        // Add headers to the worksheet
        worksheet.addRow(['User ID', 'Name', 'Email', 'Phone', 'Website', 'City', 'Company']);
  
        // Add data for each user and their posts to the worksheet
        usersWithPosts.forEach(user => {
          worksheet.addRow([
            user.id,
            user.name,
            user.email,
            user.phone,
            user.website,
            user.city,
            user.company
          ]);
  
          // Add posts for the user
          user.posts.forEach(post => {
            worksheet.addRow([
              '',
              'Post ID: ' + post.id,
              'Title: ' + post.title,
              'Body: ' + post.body,
              '',
              '',
              ''
            ]);
          });
  
          // Add an empty row between users
          worksheet.addRow([]);
        });
  
        // Set content type and attachment header for the response
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=users_posts.xlsx');
  
        // Write the workbook to the response
        workbook.xlsx.write(res)
          .then(() => {
            // End the response
            res.end();
          })
          .catch(error => {
            console.error('Error writing Excel file:', error);
            res.status(500).json({ error: 'Error writing Excel file' });
          });
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching data' });
      });
  });

// Define a route to fetch and display users and their posts
postRoute.get('/users-posts', (req, res) => {
    fetchUsersWithPosts()
      .then(usersWithPosts => {
        // Render the data on the page
        res.json(usersWithPosts);
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching data' });
      });
  });
  
  
  

module.exports = {postRoute}