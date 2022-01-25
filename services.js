var express = require('express');
var router = express.Router();
var proxy = require('./proxy');
var config = require('./config');



// define the services
router.get('/regist',function (req, res) {
  res.render('regist');
});
router.get('/registinfo',function (req, res) {
  var path=req.query.path;
  var port=req.query.port;
	if(req.session.serviceport==undefined)
		req.session.serviceport={};
  req.session.serviceport[path]=port;
  router.use(path,addpreservice,proxy.getProxy(path,port));
  res.send("new path: "+path+" with port: "+port+" added"+"</br>"+'<a href="'+path+'">'+"go to the added server"+"</a>");
});
var addpreservice = (req,res,next)=>{
	if(req.session.serviceport==undefined){
                req.session.serviceport={};
        }
        Object.assign(req.session.serviceport,config['preappend']);
	next();
}


module.exports = router;
