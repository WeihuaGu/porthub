var util = require('./util');
var url = "/ha/akfjja/hi.txt?a=34&&b=23"
var url1="/ha/akfjja/hi?a=2333&&b=454534"
var url2="/ha/akfjja/hi"

console.log(util.getfilename(url));
console.log(util.getfilename(url1))
console.log(util.getfilename(url2))
