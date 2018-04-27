'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Player = require('../models/player');


// function validatePlayerId(playerId) {
//   if (!playerId) {
//     return Promise.resolve();
//   }
//   return Player.findOne({ _id: playerId })
//     .then(result => {
//       if (!result) {
//         return Promise.reject('InvalidPlayer');
//       }
//     });
// }

const router = express.Router();

/* ========== GET/READ ALL PLAYERS ========== */
router.get('/players', (req, res, next) => {
  
  Player.find()
    .populate('name')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;