var express = require('express');
var router = express.Router();
var proxy = require('./proxy');



// define the services
router.get('/regist',function (req, res) {
  res.render('regist');
});
router.get('/registinfo',function (req, res) {
  var path=req.query.path;
  var port=req.query.port;
  //global.serviceport[path]=port;
  req.session.serviceport[path]=port;
  router.use(path,proxy.getProxy(path,port));
  res.send("new path: "+path+" with port: "+port+" added"+"</br>"+'<a href="'+path+'">'+"go to the added server"+"</a>");
});

module.exports = router;
