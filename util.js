

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

module.exports = {
	cors:cors,
	getkeylist:getkeylist
}
