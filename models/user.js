'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

module.exports = mongoose.model('Players', UserSchema);