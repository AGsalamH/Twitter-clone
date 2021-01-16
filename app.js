require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Import Routes
const userRoutes = require('./users/routes');

// Express app AKA Server
const app = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Routes
app.use('/user', userRoutes);




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