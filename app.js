var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var request = require('request');
var path = require('path')
app.use(favicon(path.join(__dirname,'favicon.ico')));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
global.servicetype = [];
const selfserver = ['/','/regist','/registinfo'];
var services = require('./services');
var definePath = (req,res,next)=>{
	if(checkPath(req.path))
		next();
	else {
		var newpath=app.get('lastservice')+req.path;
		if(req.method=="GET")
			res.redirect(newpath);
		else{
			var posturl="http://localhost:4000"+newpath;
			console.log("have a post");
			console.log(posturl);
			var r=request({
				url:posturl,
				headers : {
        				"content-type": req.get('content-type'),
					"cookie": req.cookies
    				},
				method:"POST",
				form:req.body
			},function(err,res,body){
			//	console.log(res);
			});
			req.pipe(r).pipe(res);

		}
		next();
	}
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
  res.send('你好： box欢迎你');
});

var server = app.listen(4000, function() {
    console.log('Listening on port %d', server.address().port);
});
