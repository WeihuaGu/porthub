var express = require('express');
var requestpost = require('./requestpost');
var util = require('./util');
var config = require('./config');
var tarhost = config['targethost'];

var app = express();
var definePath = (req,res,next)=>{
        flagpathcheck=checkPath(req);
        if(flagpathcheck&&(req.method=="GET")){
		if(req.path.includes('/logout'))
			res.redirect(app.get('lastservice'));


                next();
		return;
	}
        if(!flagpathcheck&&(req.method=="GET")){
		var baseurl = req.originalUrl;
                if(app.get('lastservice')==undefined)
                        var newpath=getPathService(req,app.get('lastpath'))+baseurl;
                else
                        var newpath=app.get('lastservice')+baseurl;

                res.redirect(newpath);
        }
        next();
}
var setlastPath = (req,res,next)=>{
	app.set('lastmethod',req.method);
        app.set('lastpath',req.path);
        var service=getPathService(req,req.path);
        if(service!="")
                app.set("lastservice",service);
        next();
}
var checkPath = (req)=>{
	var baseurl = req.originalUrl;
        for (var item in global.selfserver){
                if(req.path==global.selfserver[item])
                        return true;
        }
	const servicetype = util.getkeylist(req.session.serviceport);

        for (var type in servicetype) { 
                if(req.path.startsWith(servicetype[type])){
			if(req.path!="/"&&util.ispathhavefile(req.path)&&(req.path==baseurl)&&(util.countalptimes(baseurl,'/')==1))
                		return false;
			else
                        	return true;
                }
		
        }
        return false;
}

var getPathService = (req,lastpath)=>{
        if(lastpath==null)
                return "";
	const servicetype = util.getkeylist(req.session.serviceport);
        for (var type in servicetype) {
                if(lastpath.includes(servicetype[type]))
                        return servicetype[type];
        }
        return "";
}

app.use(definePath,setlastPath);
app.post('*',(req,res,next)=>{
	console.log("hava a post");
        var port=req.session.serviceport[app.get('lastservice')]['port'];
	var host=req.session.serviceport[app.get('lastservice')]['host'];
	var rawres=res;
	requestpost.makepost(port,req,(requeststream)=>{
		console.log("call makepost callback");
		requeststream.pipe(rawres);

	},host);
});
module.exports = app;

