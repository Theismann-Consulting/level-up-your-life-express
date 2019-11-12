const express = require('express');
const router = express.Router();
const noteCtrl = require('../../controllers/notes');

/*---------- Public Routes ----------*/
router.post('/', noteCtrl.create);
router.get('/:id', noteCtrl.show);
router.put('/:id', noteCtrl.update);
router.delete('/:id', noteCtrl.delete);

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