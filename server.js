var express = require('express');
var app = express();

// Environments
var env = process.env.NODE_ENV || 'development';
var envConfig = require('./config/env')[env];

// Express configuration
require('./config/config')(app, envConfig);

// Database
require('./config/models/Todo');

// Routes
require('./config/routes')(app,envConfig);

module.exports.conf = envConfig;
// Start server
app.listen(envConfig.port, function(){
  console.log('Server listening on port ' + envConfig.port);
});