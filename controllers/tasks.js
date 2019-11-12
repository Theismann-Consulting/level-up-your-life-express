const Task = require('../models/task');
const User = require('../models/user');

module.exports = {
  create,
  complete,
  index,
  update,
  show,
  assign,
  unAssign,
  delete :deleteTask
};


async function index(req, res, next) {
  try {
    await Task.find({}, function (err, tasks){
      res.json({ tasks });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

async function show(req, res) {
  try {
    await Task.findById(req.params.id, function(err, task) {
          res.json({ task });
    });
  } catch(err) {
    res.status(400).json(err);
  }
};

async function update(req, res) {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, task){
      res.json({ task });
    })
  } catch (err) {
      res.status(400).json(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    await Task.findByIdAndDelete(req.params.id, function(err, task) {
      res.json({ task });
  });
  } catch (err) {
    res.status(400).json(err);
  }
};

async function create(req, res) {
  const task = new Task(req.body);
  // if(task.recurring === false){
  //   task.daysAssigned = req.body.day;
  // }
  // task.user = req.user;
  try {
    await task.save();
    res.json({ task });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function unAssign(req, res) {
  try{
    Task.findByIdAndUpdate(req.params.id, {$pull: {daysAssigned: req.body.day}}, {new: true}, function(err, task){
      res.json({ task });
    })
  } catch (err) {
    res.status(400).json(err);
  }
};

async function assign(req, res) {
  try{
    Task.findByIdAndUpdate(req.params.id, {$push: {daysAssigned: req.body.day}}, {new: true}, function(err, task){
      res.json({ task });
    })
  } catch (err) {
    res.status(400).json(err);
  }
};

async function complete(req, res) {
  try {
    await Task.findByIdAndUpdate(req.params.id, {$pull: {daysAssigned: req.body.day}}, {new: true}, function(err, task){
      Task.findByIdAndUpdate(task._id, {$push: {daysCompleted: req.body.day}}, {new: true}, function(err, task){
        User.findById(task.user, function(err, user) {
          user.score = user.score + task.importance;
          user.levelUp(user);
          user.save();
          res.json({ task });
        
        })
    })
  })
  } catch (err) {
      res.status(400).json(err);
  }
}






/*----- Helper Functions -----*/