require('dotenv').config();

// Dependencies
const express = require('express');
const mongoose = require('mongoose');

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const tweetRoutes = require('./routes/tweet');

// Import Middleware
const {urlNotFound, globalErrorHandling} = require('./middlewares/errorHandling');
const isAuth = require('./middlewares/isAuth');

// Instantiate express app
const app = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Routes
app.use(authRoutes);
app.use(isAuth, userRoutes);
app.use(isAuth, tweetRoutes);

// 404
// Must be beneath all routes
app.use(urlNotFound);

// All Errors are passed to it.
app.use(globalErrorHandling);


const PORT = process.env.PORT || 8080;
// DB connection 
//Running the Server 
(async ()=>{
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
    console.log('MongoDB Connected ... ');
    app.listen(PORT, () => console.log(`Server is Running on PORT : ${PORT}`));
})()