const { createProxyMiddleware } = require('http-proxy-middleware');


var getProxy=(path,port)=>{
	var option = {};
	option['target']='http://localhost:'+port;
        option['changeOrigin']=true;
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
