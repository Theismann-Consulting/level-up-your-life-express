const Note = require('../models/note');
const User = require('../models/user');

module.exports = {
  create,
  update,
  show,
  delete :deleteNote
};

async function show(req, res) {
  try {
    await Note.find({daysAssigned: req.params.id}, function(err, note) {
          res.json({ note });
    });
  } catch(err) {
    res.status(400).json(err);
  }
};

async function update(req, res) {
  try {
    await Note.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, note){
      res.json({ note });
    })
  } catch (err) {
      res.status(400).json(err);
  }
}

async function deleteNote(req, res, next) {
  try {
    await Note.findByIdAndDelete(req.params.id, function(err, note) {
      res.json({ note });
  });
  } catch (err) {
    res.status(400).json(err);
  }
};

async function create(req, res) {
  const note = new Note(req.body);
  note.daysAssigned = req.body.day;
  note.user = req.user;
  try {
    await note.save();
    res.json({ note });
  } catch (err) {
    res.status(400).json(err);
  }
}


/*----- Helper Functions -----*/