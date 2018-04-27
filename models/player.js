'use strict';

const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  ratings: Array,
  pos: String,
  imgURL: String
});

module.exports = mongoose.model('Players', playerSchema);


//This is to import my json file data into the database
// mongoimport --uri "mongodb://username:baseball@ds259109.mlab.com:59109/nba-app" --collection players --drop --file /Users/tharakawijekularatne/code/nba-app/client/src/players.json --jsonArray
