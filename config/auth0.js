var express = require('express');
var app = express();
var jwt = require('express-jwt');

var port = process.env.PORT || 8080;

var jwtCheck = jwt({
  secret: '1a6wY8LQ5RUjACK8cHulF7XXMKAm7gsT',
  audience: 'http://localhost:3001/api',
  issuer: 'https://theismannconsulting.auth0.com/'
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.listen(port);

console.log('Running on port ', port);