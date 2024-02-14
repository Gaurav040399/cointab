# cointab
 

This repository contains the backend and frontend code for a Cointab application. 
The backend provides functionalities for fetching json data, Adding into database, updating it, Download in Excel , Add data in bulk quantity. 

### Deployed Link
Backend in work locally right now.
 [Backend](http://localhost:8080) 
 [Frontend](https://cointabapp.netlify.app/)
 
## Backend Functionality

### Initialization
To get started, run the following command to install dependencies:
 - `npm install`
 
### Routes

#### User Routes
- `POST /user/add`: Adding new user

#### Post Routes
- `GET /posts/download-excel`: All Data in excel file.
- `GET /posts/users-posts`: All user data with their posts.
- `POST /posts/bulk-add-posts`: Add a in bulk quantity.


### Tech Stack

## Backend
- Node.js
- MySQL
- Express.js

## Frontend Functionality

### Functionality
The frontend provides the following functionalities:
- User Data
- Download in Excel file
- Add data in bulk quantity

### Tech Stack
- HTML
- CSS
- JavaScript

## Usage
1. Start the backend server using `npm run start`.
2. Implement the frontend to interact with the backend API endpoints.

## Screenshots
![Home Page](/Images//Home%20page.png) 
![Add User](/Images/Add%20user.png)
![Post Page](/Images/post%20page.png)
![Download in Excel](/Images/download%20in%20excel.png)




