var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var path = require('path')
var validpath = require('./validpath');
var services = require('./services');
var preservices = require('./preservices');
var util = require('./util');
var config = require('./config');

var app = express();
app.set('view engine', 'pug');
app.set('views', './public/views')
app.use(session({secret: 'keyboard cat',resave: true,saveUninitialized: true}));
app.use(favicon(path.join(__dirname,'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

global.selfserver = ['/','/regist','/registinfo'];

app.all('*',util.cors);
app.use(validpath);
app.use(preservices);
app.use(services);
app.get('/', function(req, res){
  res.send('<!DOCTYPE html>'+'<html><body>'+'你好： box欢迎你'+'</br>'+JSON.stringify(req.session.serviceport)+'</body></html>');
});

var server = app.listen(4000, function() {
    console.log('Listening on port %d', server.address().port);
});
