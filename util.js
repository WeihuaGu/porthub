

var cors=(req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers","X-Requested-With");
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();

}

var getkeylist = (dic)=>{
	var list = [];
	for(var key in dic){
		list.push(key);
	}
	return list;
}
var countalptimes = (str ,alp)=>{
	var count = 0;
	for (var i = 0; i < str.length; i++) {
		 if(alp==str[i])
			count++
	}
	return count;


}
var ispathhavefile = (path)=>{           //path not include "http://host:port"
	var file = getfilename(path);
	if(file == null)
		return false;
	else
		return true;

}

var getfilename = (url)=>{
	return url.match(/^.+\/(\w+\.\w+)/i)
}

	
module.exports = {
	cors:cors,
	getkeylist:getkeylist,
	countalptimes:countalptimes,
	getfilename:getfilename,
	ispathhavefile:ispathhavefile

}
