'use strict';

const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  ratings: Array,
  pos: String,
  imgURL: String
});

playerSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Player', playerSchema);
