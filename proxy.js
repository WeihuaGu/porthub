const { createProxyMiddleware } = require('http-proxy-middleware');
var config = require('./config');
var tarhost = config['targethost'];


var getProxy=(path,port,host=tarhost)=>{
	var option = {};
	
	if(host.startsWith('http'))
		option['target']=host+':'+port;
	else
		option['target']='http://'+host+':'+port;

        option['changeOrigin']=false;
	option['secure']=false;
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
