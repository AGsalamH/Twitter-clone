require('dotenv').config();

// Dependencies
const express = require('express');
const mongoose = require('mongoose');

// Import Routes
const authRoutes = require('./users/auth/routes');
const userRoutes = require('./users/routes');
const tweetRoutes = require('./tweets/routes');


// Utils
const isAuth = require('./users/auth/isAuth');

// Express app AKA Server
const app = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Routes
app.use(authRoutes);
app.use(isAuth, userRoutes);
app.use(isAuth, tweetRoutes);

// Error handling Middleware
app.use((error, req, res, next)=>{
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        error: error.message
    })
});

const PORT = process.env.PORT || 8080;
const db = {
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
};

// DB connection 
//Running the Server 
(async ()=>{
    await mongoose.connect(process.env.MONGO_URI, db.options);
    console.log('MongoDB Connected ... ');
    app.listen(PORT, () => console.log(`Server is Running on PORT : ${PORT}`));
})()