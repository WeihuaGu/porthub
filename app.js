var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var request = require('request');
var requestpost = require('./requestpost');
var path = require('path')
app.use(favicon(path.join(__dirname,'favicon.ico')));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
global.servicetype = [];
global.serviceport = {};
const selfserver = ['/','/regist','/registinfo'];
var services = require('./services');
var definePath = (req,res,next)=>{
	flagpathcheck=checkPath(req.path);
	if(flagpathcheck&&(req.method=="GET"))
		next();
	if(!flagpathcheck&&(req.method=="GET")){
		if(app.get('lastservice')==undefined)
			var newpath=getPathService(app.get('lastpath'))+req.path;
		else
			var newpath=app.get('lastservice')+req.path;
		
		res.redirect(newpath);
	}


	if(req.method=="POST") {
			console.log("have a post");
			var port=global.serviceport[app.get('lastservice')];
			console.log(global.serviceport);
			console.log(app.get('lastservice'));
			req.pipe(requestpost.makepost(port,req)).pipe(res);
	}
	next();
}
var setlastPath = (req,res,next)=>{
	app.set('lastpath',req.path);
	var service=getPathService(req.path);
	if(service!="")
		app.set("lastservice",service);
	next();
}
var checkPath = (path)=>{
	//console.log("check internal: "+path);
	for (var item in selfserver){
		if(path==selfserver[item])
			return true;
	}

	for (var type in global.servicetype) { 
		if(path.includes(global.servicetype[type])){
			return true;
		}
	}
	return false;
}
var getPathService = (lastpath)=>{
	if(lastpath==null)
		return "";
        for (var type in global.servicetype) {
                if(lastpath.includes(global.servicetype[type]))
                        return servicetype[type];
        }
        return "";
}

app.all('*',function(req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers","X-Requested-With");
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
  });

app.use(definePath,setlastPath);
app.use(services);

app.get('/', function(req, res){
  res.send('你好： box欢迎你'+'</br>'+JSON.stringify(global.servicetype)+'</br>'+JSON.stringify(global.serviceport));
});

var server = app.listen(4000, function() {
    console.log('Listening on port %d', server.address().port);
});
