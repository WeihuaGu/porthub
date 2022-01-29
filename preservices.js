var express = require('express');
var router = express.Router();
var proxy = require('./proxy');
var config = require('./config');

var addpreservice = (req,res,next)=>{
	if(req.session.serviceport==undefined){
                req.session.serviceport={};
        }
        Object.assign(req.session.serviceport,config['preappend']);
	next();
}

router.use(addpreservice);
for(var path in config['preappend']){
	router.use(path,proxy.getProxy(path,config['preappend'][path]['port'],config['preappend'][path]['host']));
}


module.exports = router;
