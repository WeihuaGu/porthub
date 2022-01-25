var request = require('request');
var FormData = require('form-data');
const formidable = require('formidable');
var fs = require('fs');
var config = require('./config');
var tarhost = config['targethost'];
var getparam=(port,req,paramcallback)=>{
	var host = req.get('host').split(':')[0];
	var baseoption = {
			method: "POST",
			url: "http://"+tarhost+":"+port+req.path,
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
				"cookie": JSON.stringify(req.cookies)
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
			body: JSON.stringify(req.body),
			json: true
		};
		const option=Object.assign(typeoption,baseoption);
		paramcallback(option);
                return;

	}
	if(type.includes('multipart/form-data')){
		var callparamcallback = paramcallback;
		const form = formidable({ multiples: true });
		var gentypeoption = (fielddata,filedata)=>{  //fk call back 
			var form = {};
			for (var key in fielddata){
				form[key]=fielddata[key];
			}
			for(var key in filedata){
				form[key]=fs.createReadStream(filedata[key]['filepath'],{mimetype:filedata[key]['mimetype']} );
			}
			var typeoption = {
                        	formData: form
                	};
                	const option=Object.assign(typeoption,baseoption);
			console.log("gen type option"+"\n"+option);
			callparamcallback(option);
		}
		var formcall = (err, fields, files) => {
                  if (err) {
                   	console.log(err);
                  	return;
                  }
		  console.log("我是解析form-data的回调");
		  console.log({fields,files});
		  gentypeoption(fields, files );
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
