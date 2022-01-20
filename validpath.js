var express = require('express');
var requestpost = require('./requestpost');

var app = express();
var definePath = (req,res,next)=>{
        flagpathcheck=checkPath(req.path);
        if(flagpathcheck&&(req.method=="GET")){
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


        if(req.method=="POST") {
                        console.log("have a post");
                        //var port=global.serviceport[app.get('lastservice')];
                        //console.log(app.get('lastservice'));
                        //console.log(port);
		        
		        try{
			var r = requestpost.makepost(3000,req);
                        req.pipe(r,{end: false}).pipe(res);
			}catch(e) {
			}finally{
			}
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
        for (var item in global.selfserver){
                if(path==global.selfserver[item])
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
module.exports = app;

