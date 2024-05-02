const Note = require('../models/noteModel');

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json({
      status: 'success',
      results: notes.length,
      notes,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        status: 'fail',
        message: 'Note not found',
      });
    }

    res.status(200).json({
      status: 'success',
      note,
      //   data: {
      //     note,
      //   },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createNote = async (req, res) => {
  try {
    const newNote = await Note.create(req.body);
    res.status(201).json({
      status: 'success',
      newNote,
      //   data: {
      //     note: newNote,
      //   },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({
        status: 'fail',
        message: 'Note not found',
      });
    }
    res.status(204).json({
      // no content
      status: 'success',
      message: 'Note deleted',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
