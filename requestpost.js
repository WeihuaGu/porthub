var request = require('request');
var formdata = require('form-data');
const formidable = require('formidable');
var fs = require('fs');

var getparam=(port,req,paramcallback)=>{
	var host = req.get('host').split(':')[0];
	var baseoption = {
			method: "POST",
			url: "http://localhost:"+port+req.path,
			headers: {
				"host": req.get('host'),
				"user-agent": req.get('user-agent'),
				"accept": req.get('accept'),
				"accept-language": req.get('accept-language'),
				"accept-encoding": req.get('accept-encoding'), 
				"referer": req.get('referer'),
				"origin": req.get('origin'),
				"connection": req.get('connection'),
				"upgrade-insecure-requests": req.get('upgrade-insecure-requests'),
				"content-type": req.get('content-type'),
				"cookie": req.cookies
			}
	};

	var type=req.get('content-type');
	if(type.includes('application/x-www-form-urlencoded')){
		var typeoption  = {
			form: req.body
		};
		const option=Object.assign(typeoption, baseoption);
		paramcallback(option);
		return;
	}
	
	if(type.includes('application/json')){
		var typeoption = {
			body: req.body,
			json: true
		};
		const option=Object.assign(typeoption,baseoption);
		paramcallback(option);
                return;

	}
	if(type.includes('multipart/form-data')){
		var callparamcallback = paramcallback;
		const form = formidable({ multiples: true });
		var gentypeoption = (form)=>{
			var typeoption = {
                        	formData: form
                	};
                	const option=Object.assign(typeoption,baseoption);
			console.log("gen type option"+option);
			callparamcallback(option);
		}
		var formcall = (err, fields, files) => {
                  if (err) {
                   	console.log(err);
                  	return;
                  }
		  gentypeoption({ fields, files });
                 };
  		form.parse(req,formcall);
        }


}

var makepost=(port,req,callback)=>{
	var makepostcallback = callback;
	var paramcallback = (option)=>{
		 console.log(option);
		 var r=request(option,function(err,requestedres,body){
                	if(err==null){
				console.log(body);

                	}
                	else
                  		console.log(err);
                 });
		 makepostcallback(r);
	}

	getparam(port,req,paramcallback);
}


module.exports = {
	makepost:makepost
}
