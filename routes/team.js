'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Team = require('../models/team');



const router = express.Router();

/* ========== GET/READ MYTEAM ========== */
router.get('/', (req, res, next) => {
  
  Team.findOne()
    .populate('players')
    .then(results => {

      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== UPDATE PLAYERS ========== *///Creating a new player patch
router.patch('/', (req, res, next) => {
  const { playerId, teamId } = req.body;


  Team.findOne()
    .then(team => {
      team.players.push(mongoose.Types.ObjectId(playerId))
      return team.save()
    })
    .then(team => {
      res.json({team})
    })
  
});


/* ========== DELETE/REMOVE A SINGLE PLAYER ========== */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  Team.findOneAndRemove({_id: id})
    .then(result => {
      if(result) {
        res.status(204).end();
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});



module.exports = router;