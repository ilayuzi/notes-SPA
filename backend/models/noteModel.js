const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'a note must have a title'],
    unique: true,
  },

  text: {
    type: String,
    required: [true, 'a note must have a text'],
    unique: true,
  },
  date: {
    type: String,
  },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
