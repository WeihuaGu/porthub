var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path')
var validpath = require('./validpath');
var services = require('./services');

var app = express();
app.set('view engine', 'pug');
app.use(favicon(path.join(__dirname,'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

global.servicetype = [];
global.serviceport = {};
global.selfserver = ['/','/regist','/registinfo'];


app.use(validpath);
app.use(services);
app.all('*',function(req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers","X-Requested-With");
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
  });


app.get('/', function(req, res){
  res.send('你好： box欢迎你'+'</br>'+JSON.stringify(global.serviceport));
});

var server = app.listen(4000, function() {
    console.log('Listening on port %d', server.address().port);
});
