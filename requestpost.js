var request = require('request');
var formdata = require('form-data');
const formidable = require('formidable');
var fs = require('fs');

var getparam=(port,req,paramcallback)=>{
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
		const form = formidable({ multiples: true });
		var gentypeoption = (form)=>{
			var typeoption = {
                        	formData: form
                	};
                	const option=Object.assign(typeoption,baseoption);
			paramcallback(option);
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
		//console.log(option);
		 var r=request(option,function(err,requestedres,body){
                	if(err==null){
				//console.log(body);

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
