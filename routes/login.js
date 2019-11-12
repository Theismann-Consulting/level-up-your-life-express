const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const userCtrl = require('../controllers/users');
// const tokenService = require('../src/services/tokenService');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

//Google Auth
router.get('/google', passport.authenticate(
    'google', { scope: ['profile', 'email'] }
));
    
router.get('/facebook', passport.authenticate(
    'facebook', { scope: ['public_profile', 'email'] }
));
    
router.get('/g-callback', passport.authenticate(
    'google', { session: false }),
    async function(req, res){
        try{
            const token = createJWT(req.user);
            res.json(token);
            console.log('success');
        }catch (err) {
            console.log(err);
            res.status(401).json();
        }
    }
);

router.get('/fb-callback', passport.authenticate(
    'facebook', { session: false }),
    async function(req, res){
        try{
            const token = createJWT(req.user);
            res.json(token);
            console.log('success');
        }catch (err) {
            console.log(err);
            res.status(401).json();
        }
    }
);

router.get('/failure', function(req, res){
    res.status(401).json({err: 'Unable to Authorize'});
});

function createJWT(user) {
    return jwt.sign(
      {user}, // data payload
      SECRET,
      {expiresIn: '24h'}
    );
  }

module.exports = router;