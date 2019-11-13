const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const usersCtrl = require('../../controllers/users');

/*---------- Public Routes ----------*/
router.post('/login', usersCtrl.login);
router.post('/signup', usersCtrl.signup);

/*---------- Protected Routes ----------*/

router.use(require('../../config/auth'));

router.get('/', usersCtrl.index);
router.get('/:id', usersCtrl.show);
router.put('/:id', usersCtrl.update);
router.delete('/:id', usersCtrl.delete);
router.delete('/:id/logout/google', usersCtrl.disconnectGoogle);
router.delete('/:id/logout/facebook', usersCtrl.disconnectFacebook);


/*----- Helper Functions -----*/

function isLoggedIn(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized: Please Log In'});
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin === true) return next();
  return res.status(401).json({msg: 'Not Authorized: Please Log In'});
}

function isContributor(req, res, next) {
  if (req.user.role === 'Contributor' || req.user.isAdmin === true) return next();
  return res.status(401).json({msg: 'Not Authorized: Please Log In'});
}

module.exports = router;