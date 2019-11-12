const express = require('express');
const router = express.Router();
const Workout = require('../../models/workout');
const workoutCtrl = require('../../controllers/workouts');

/*---------- Public Routes ----------*/
router.post('/', workoutCtrl.create);
router.post('/:id/complete', workoutCtrl.complete);
router.post('/:id/assign', workoutCtrl.assign);
router.post('/:id/unassign', workoutCtrl.unAssign);
router.get('/', workoutCtrl.index);
router.get('/:id', workoutCtrl.show);
router.put('/:id', workoutCtrl.update);
router.delete('/:id', workoutCtrl.delete);

/*---------- Protected Routes ----------*/

router.use(require('../../config/auth'));


/*----- Helper Functions -----*/

function isLoggedIn(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized: Please Log In'});
}

function isAdmin(req, res, next) {
  if (req.user.role === 'Admin') return next();
  return res.status(401).json({msg: 'Not Authorized: Please Log In'});
}

function isContributor(req, res, next) {
  if (req.user.role === 'Contributor' || req.user.role === 'Admin') return next();
  return res.status(401).json({msg: 'Not Authorized: Please Log In'});
}

module.exports = router;