const mongoose = require('mongoose');

const listItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    checked: Boolean,
  });

mongoose.model('list_item', listItemSchema)

module.exports = mongoose.model('list_item', listItemSchema)