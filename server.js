const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');

const app = express();

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};

require('dotenv').config();
require('./config/database');
require('./config/passport');

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(passport.initialize());
app.use(cors(corsOption));

// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route
app.use('/login', require('./routes/login'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/workouts', require('./routes/api/workouts'));
app.use('/api/tasks', require('./routes/api/tasks'));
// app.use('/api/mealPlans', require('./routes/api/mealPlans'));
// app.use('/api/categories', require('./routes/api/categories'));


// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



// Port Configuation
const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});