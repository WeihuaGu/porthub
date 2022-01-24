var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var path = require('path')
var validpath = require('./validpath');
var services = require('./services');
var util = require('./util');
var config = require('./config');

var app = express();
app.set('view engine', 'pug');
app.use(session({secret: 'keyboard cat',resave: true,saveUninitialized: true}));
app.use(favicon(path.join(__dirname,'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

global.selfserver = ['/','/regist','/registinfo'];
global.targethost = config['targethost'];

app.all('*',util.cors);
app.use(validpath);
app.use(services);
app.get('/', function(req, res){
	if(req.session.serviceport==undefined)
		req.session.serviceport={};
  res.send('<!DOCTYPE html>'+'<html><body>'+'你好： box欢迎你'+'</br>'+JSON.stringify(req.session.serviceport)+'</body></html>');
});

var server = app.listen(4000, function() {
    console.log('Listening on port %d', server.address().port);
});
