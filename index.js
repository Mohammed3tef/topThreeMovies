const express = require('express');
const {topFavouriteMoviesAmongFriends} = require('./controllers/topFavouriteMoviesController')

const app = express();

const PORT = 3800 ;

const connectToDatabase = require("./Config/db");


  app.get('/topFavouriteMovies/:userID',topFavouriteMoviesAmongFriends);

// Establish the database connection before starting the server
connectToDatabase().then(() => {
    // Start the Express server
    app.listen(PORT, () => {
        console.log(`Express server is running on port ${PORT}`);
    });
});







