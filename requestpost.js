var request = require('request');
var getparam=(port,req)=>{
	var baseoption = {
			method: "POST",
			url: "http://localhost:"+port+req.path,
			headers: {
				"content-type": req.get('content-type'),
				//cookie: req.cookies
			}
	};

	var type=req.get('content-type');
	if(type.includes('application/x-www-form-urlencoded')){
		var typeoption  = {
			form: req.body
		};
		const option=Object.assign(typeoption, baseoption);
		return option;
	}
	
	if(type.includes('application/json')){
		var typeoption = {
			body: req.body,
			json: true
		};
		const option=Object.assign(typeoption,baseoption);
		return option;
	}

}

var makepost=(port,req)=>{
	var option = getparam(port,req);
	try{
	var r=request(option,function(err,res,body){
		if(err==null)
			console.log(body);
		else 
			console.log(err);
                        });
	return r;
	}catch(e){
	}finally{
	}
}


module.exports = {
	makepost:makepost
}
