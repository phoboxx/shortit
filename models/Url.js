const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  baseURL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    required: true,
  },
});

module.exports = Url = new mongoose.model('Url', urlSchema);
