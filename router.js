var makeGet = require("./makeGet");
var makePost = require("./makePost");
var posts = require("./posts.js");
var travellers = require("./travellers");
var url = require("url");

function route (request, callback){
	var method = request.method;
	var	reqUrl = request.url;
	var pathname = url.parse(reqUrl).pathname;
	if (pathname == "/posts"){
		posts.get(function (err, callbackValue){
			if (err){
				return err;
			}
			callback(callbackValue);
		})
	}
	else if (pathname == "/travellers"){
		travellers.get(function (err, callbackValue){
			if (err){
				return err;
			}
			callback("fklasfl;sjk");
		})
	}
}

exports.route = route
