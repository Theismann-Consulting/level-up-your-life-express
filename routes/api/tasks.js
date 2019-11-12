const express = require('express');
const router = express.Router();
const taskCtrl = require('../../controllers/tasks');

/*---------- Public Routes ----------*/
router.post('/', taskCtrl.create);
router.post('/:id/complete', taskCtrl.complete);
router.post('/:id/assign', taskCtrl.assign);
router.post('/:id/unassign', taskCtrl.unAssign);
router.get('/', taskCtrl.index);
router.get('/:id', taskCtrl.show);
router.put('/:id', taskCtrl.update);
router.delete('/:id', taskCtrl.delete);

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