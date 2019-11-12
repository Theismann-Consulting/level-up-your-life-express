const express = require('express');
const router = express.Router();
const mealPlanCtrl = require('../../controllers/mealPlans');

/*---------- Public Routes ----------*/
router.post('/', mealPlanCtrl.create);
router.post('/:id/complete', mealPlanCtrl.complete);
router.post('/:id/assign', mealPlanCtrl.assign);
router.post('/:id/unassign', mealPlanCtrl.unAssign);
router.get('/', mealPlanCtrl.index);
router.get('/:id', mealPlanCtrl.show);
router.put('/:id', mealPlanCtrl.update);
router.delete('/:id', mealPlanCtrl.delete);

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