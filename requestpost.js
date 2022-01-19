var request = require('request');
var getparam=(port,req)=>{
	var type=req.get('content-type');
	if(type.includes('application/x-www-form-urlencoded'))
		return {
				url:"http://localhost:"+port,
                                headers : {
                                        "content-type": req.get('content-type'),
                                        "cookie": req.cookies
                                },
                                method:"POST",
                                form:req.body
                        };
	
	if(type.includes('application/json'))
                return {
				url:"http://localhost:"+port,
                                headers : {
                                        "content-type": req.get('content-type'),
                                        "cookie": req.cookies
                                },
                                method:"POST",
                                body:req.body,
				json:true
                        };

}

var makepost=(port,req)=>{
	var r=request(getparam(port,req),function(err,res,body){
                                console.log(body);
                        });
	return r;
}

module.exports = {
	makepost:makepost
}
