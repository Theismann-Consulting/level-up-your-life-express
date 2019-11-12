const MealPlan = require('../models/mealPlan');
const User = require('../models/user');

module.exports = {
  create,
  complete,
  index,
  update,
  show,
  assign,
  unAssign,
  delete :deleteMealPlan
};


async function index(req, res, next) {
  try {
    await MealPlan.find({}, function (err, mealPlans){
      res.json({ mealPlans });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

async function show(req, res) {
  try {
    await MealPlan.findById(req.params.id, function(err, mealPlan) {
          res.json({ mealPlan });
    });
  } catch(err) {
    res.status(400).json(err);
  }
};

async function update(req, res) {
  try {
    await MealPlan.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, mealPlan){
      res.json({ mealPlan });
    })
  } catch (err) {
      res.status(400).json(err);
  }
}

async function deleteMealPlan(req, res, next) {
  try {
    await MealPlan.findByIdAndDelete(req.params.id, function(err, mealPlan) {
      res.json({ mealPlan });
  });
  } catch (err) {
    res.status(400).json(err);
  }
};

async function create(req, res) {
  const mealPlan = new MealPlan(req.body);
  mealPlan.user = req.user;
  try {
    await mealPlan.save();
    res.json({ mealPlan });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function unAssign(req, res) {
  try{
    MealPlan.findByIdAndUpdate(req.params.id, {$pull: {daysAssigned: req.body.day}}, {new: true}, function(err, mealPlan){
      res.json({ mealPlan });
    })
  } catch (err) {
    res.status(400).json(err);
  }
};

async function assign(req, res) {
  try{
    MealPlan.findByIdAndUpdate(req.params.id, {$push: {daysAssigned: req.body.day}}, {new: true}, function(err, mealPlan){
      res.json({ mealPlan });
    })
  } catch (err) {
    res.status(400).json(err);
  }
};

async function complete(req, res) {
  try {
    await MealPlan.findByIdAndUpdate(req.params.id, {$pull: {daysAssigned: req.body.day}}, {new: true}, function(err, mealPlan){
      MealPlan.findByIdAndUpdate(mealPlan._id, {$push: {daysCompleted: req.body.day}}, {new: true}, function(err, mealPlan){
        User.findById(mealPlan.user, function(err, user) {
          user.score = user.score + mealPlan.importance;
          user.levelUp(user);
          user.save();
          res.json({ mealPlan });
        
        })
    })
  })
  } catch (err) {
      res.status(400).json(err);
  }
}






/*----- Helper Functions -----*/