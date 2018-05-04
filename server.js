'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); //connecting to mongodb
const cors = require('cors');
// const passport = require('passport'); //auth middleware
const { PORT, DATABASE_URL, MONGODB_URI } = require('./config');

const playerRouter = require('./routes/players');
const teamRouter = require('./routes/team');
 

// Create an Express application
const app = express();


app.use(
  cors({//Look up what cores does
    origin: MONGODB_URI
  })
);

app.use(bodyParser.json());//parse the body

app.use('/players', playerRouter);
app.use('/team', teamRouter);

  

// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

// Listen for incoming connections
if (require.main === module) {
  mongoose.connect(DATABASE_URL)
    .then(instance => {
      const conn = instance.connections[0];
      console.info(`Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`);
    })
    .catch(err => {
      console.error(`ERROR: ${err.message}`);
      console.error('\n === Did you remember to start `mongod`? === \n');
      console.error(err);
    });
  
  app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}
  
module.exports = app; // Export for testing