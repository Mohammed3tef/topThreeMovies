const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: String,
    duration: String, 
    actors: [String], 
    ratings: [Number], 
    favorites: [Number]
    
  });

module.exports = mongoose.model("Movies", MovieSchema);