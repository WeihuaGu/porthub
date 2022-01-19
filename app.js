var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var path = require('path')
app.use(favicon(path.join(__dirname,'favicon.ico')));
app.set('view engine', 'pug');
global.servicetype = [];
const selfserver = ['/','/regist','/registinfo'];
var services = require('./services');
var definePath = (req,res,next)=>{
	if(checkPath(req.path))
		next();
	else {
		var newpath=getPathService(app.get('lastpath'))+req.path;
		res.redirect(newpath);
		next();
	}
}
var setlastPath = (req,res,next)=>{
	app.set('lastpath',req.path);
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

app.use(definePath,setlastPath);
app.use(services);

app.get('/', function(req, res){
  res.send('你好： box欢迎你');
});

var server = app.listen(4000, function() {
    console.log('Listening on port %d', server.address().port);
});
