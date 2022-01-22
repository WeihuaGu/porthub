var request = require('request');
var formdata = require('form-data');
const formidable = require('formidable');
var fs = require('fs');

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
	if(type.includes('multipart/form-data')){
		const form = formidable({ multiples: true });
		var formcall = (err, fields, files) => {
                  if (err) {
                   	console.log(err);
                  	return;
                  }
                  console.dir({ fields, files });
                 };
  		form.parse(req,formcall);

                var typeoption = {
			//formData: form
                };
                const option=Object.assign(typeoption,baseoption);
                return option;
        }


}

var makepost=(port,req)=>{
	var option = getparam(port,req);
	var r=request(option,function(err,requestedres,body){
		if(err==null){

		}
		else 
		  console.log(err);
                        });
	return r;
}


module.exports = {
	makepost:makepost
}
