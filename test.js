var requestpost = require('./requestpost');
var req={
	"path": "/postjson",
	"content-type": "application/json"
};
req.body={
	name:  "test",
	haha: "haha"
}
req.get = function(key){
	return this[key]
}
requestpost.makepost(3000,req);


