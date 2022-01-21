var request = require('request');
var formdata = require('form-data');
var multiparty = require('multiparty');
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
		var form = new multiparty.Form({ uploadDir: './tmp'});
		form.parse(req,(err,fields,files)=>{
		//var fields = req.body;
                //var files = req.files;
                //var form = new formdata();
                if(fields){
                        for(let i in fields){
                                if(fields.hasOwnProperty(i)){
                                       // form.append(i,fields[i]);
                                }
                        }
                }
                if(files){
                        var item = files.file;
			console.log("form-data");
			console.dir(files);
                        //form.append(item['fieldName'],fs.createReadStream(item['path']));
                }

                var typeoption = {
			formData: form
                };
                const option=Object.assign(typeoption,baseoption);
                return option;
		})
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
