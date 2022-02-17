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
  var host=req.query.host;
  req.session.serviceport[path]={
	  "host": host,
	  "port": port
  };
  router.use(path,proxy.getProxy(path,port,host));
  res.send("new path: "+path+" with port: "+port+" added"+"</br>"+'<a href="'+path+'">'+"go to the added server"+"</a>");
});


module.exports = router;
