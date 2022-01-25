const { createProxyMiddleware } = require('http-proxy-middleware');
var config = require('./config');
var tarhost = config['targethost'];


var getProxy=(path,port)=>{
	var option = {};
	option['target']='http://'+tarhost+':'+port;
        option['changeOrigin']=false;
	pathrewrite={};
	sawpath="^"+path;
	pathrewrite[sawpath]="";
        option['pathRewrite']= pathrewrite;

	var proxy = createProxyMiddleware('**',option);
	return proxy


}

module.exports = {
	getProxy:getProxy
}
