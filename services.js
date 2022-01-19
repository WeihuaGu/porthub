var express = require('express');
var router = express.Router();
var proxy = require('./proxy');


// middleware that is specific to this router

// define the services
//router.use('/wallabag', proxy.getProxy('/wallabag',2000));
router.get('/regist',function (req, res) {
  res.render('regist');
});
router.get('/registinfo',function (req, res) {
  var path=req.query.path;
  var port=req.query.port;
  global.servicetype.push(path);
  router.use(path,proxy.getProxy(path,port));
  res.send("new path:"+path+" with port:"+port+"added");
});

module.exports = router;
