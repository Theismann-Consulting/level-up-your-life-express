const express = require('express');
const router = express.Router();
const passport = require('passport');
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
    'google', { 
        session: false,
        failureRedirect: 'http://localhost:3000/login'   
    }),
    async function(req, res){
        try{
            const token = createJWT(req.user);
            console.log(token);
            res.redirect(`http://localhost:3000?token=${token}`);
        }catch (err) {
            res.redirect('http://localhost:3000/login');
        }
    }
);

router.get('/fb-callback', passport.authenticate(
    'facebook', { 
        session: false,
        failureRedirect: 'http://localhost:3000/login'   
    }),
    async function(req, res){
        try{
            const token = createJWT(req.user);
            console.log(token);
            res.redirect(`http://localhost:3000?token=${token}`);
        }catch (err) {
            res.redirect('http://localhost:3000/login');
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