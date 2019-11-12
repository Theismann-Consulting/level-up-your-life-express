const Workout = require('../models/workout');
const User = require('../models/user');

module.exports = {
  create,
  complete,
  index,
  update,
  show,
  assign,
  unAssign,
  delete :deleteWorkout
};


async function index(req, res, next) {
  try {
    await Workout.find({}, function (err, workouts){
      res.json({ workouts });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

async function show(req, res) {
  try {
    await Workout.findById(req.params.id, function(err, workout) {
          res.json({ workout });
    });
  } catch(err) {
    res.status(400).json(err);
  }
};

async function update(req, res) {
  try {
    await Workout.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, workout){
      res.json({ workout });
    })
  } catch (err) {
      res.status(400).json(err);
  }
}

async function deleteWorkout(req, res, next) {
  try {
    await Workout.findByIdAndDelete(req.params.id, function(err, workout) {
      res.json({ workout });
  });
  } catch (err) {
    res.status(400).json(err);
  }
};

async function create(req, res) {
  const workout = new Workout(req.body);
  workout.user = req.user;
  try {
    await workout.save();
    res.json({ workout });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function unAssign(req, res) {
  try{
    Workout.findByIdAndUpdate(req.params.id, {$pull: {daysAssigned: req.body.day}}, {new: true}, function(err, workout){
      res.json({ mealPlan });
    })
  } catch (err) {
    res.status(400).json(err);
  }
};

async function assign(req, res) {
  try{
    Workout.findByIdAndUpdate(req.params.id, {$push: {daysAssigned: req.body.day}}, {new: true}, function(err, workout){
      res.json({ mealPlan });
    })
  } catch (err) {
    res.status(400).json(err);
  }
};

async function complete(req, res) {
  try {
    await Workout.findByIdAndUpdate(req.params.id, {$pull: {daysAssigned: req.body.day}}, {new: true}, function(err, workout){
      Workout.findByIdAndUpdate(workout._id, {$push: {daysCompleted: req.body.day}}, {new: true}, function(err, workout){
        User.findById(task.user, function(err, user) {
          user.score = user.score + task.importance;
          user.levelUp(user);
          user.save();
          res.json({ workout });
      })
    })
  })
  } catch (err) {
      res.status(400).json(err);
  }
}




/*----- Helper Functions -----*/