var express = require('express');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

module.exports = function(app, envConfig){
	//app.use(favicon(envConfig.rootPath + '/public/favicon.ico'));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());
	
};