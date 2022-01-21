var express = require('express');
var requestpost = require('./requestpost');
var util = require('./util');

var app = express();
var definePath = (req,res,next)=>{
        flagpathcheck=checkPath(req.path);
	console.log("check path");
	console.log(flagpathcheck);
        if(flagpathcheck&&(req.method=="GET")){
		console.log("path checked go to next");
                next();
		return;
	}
        if(!flagpathcheck&&(req.method=="GET")){
                if(app.get('lastservice')==undefined)
                        var newpath=getPathService(app.get('lastpath'))+req.path;
                else
                        var newpath=app.get('lastservice')+req.path;

                res.redirect(newpath);
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
        for (var item in global.selfserver){
                if(path==global.selfserver[item])
                        return true;
        }
	const servicetype = util.getkeylist(global.serviceport);
	console.log("目前serviceport"+JSON.stringify(global.serviceport));
	console.log("now servicetye"+servicetype);

        for (var type in servicetype) { 
                if(path.includes(servicetype[type])){
                        return true;
                }
        }
        return false;
}
var getPathService = (lastpath)=>{
        if(lastpath==null)
                return "";
	const servicetype = util.getkeylist(global.serviceport);
        for (var type in servicetype) {
                if(lastpath.includes(servicetype[type]))
                        return servicetype[type];
        }
        return "";
}

app.use(definePath,setlastPath);
app.post('*',(req,res)=>{
	console.log("have a post");
        var port=global.serviceport[app.get('lastservice')];
        console.log(app.get('lastservice'));
        console.log(port);

	var r=requestpost.makepost(3000,req);
	r.pipe(res);
});
module.exports = app;

