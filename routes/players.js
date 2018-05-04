'use strict';

const express = require('express');

const Player = require('../models/player');



const router = express.Router();

/* ========== GET/READ ALL PLAYERS ========== */
router.get('/', (req, res, next) => {
  
  Player.find()
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;