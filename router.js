var makeGet = require("./makeGet");
var makePost = require("./makePost");
var posts = require("./posts.js");
var travellers = require("./travellers");
var url = require("url");

function route (request, callbackToServer){
	var method = request.method;
	var	reqUrl = request.url;
	var pathname = url.parse(reqUrl).pathname;
	console.log(process.env.HEROKU_POSTGRESQL_VIOLET_URL);
	if (pathname == "/posts"){
		posts.get(function (err, callbackValue){
			callbackToServer(err, callbackValue);
		});
	}
	else if (pathname == "/travellers"){
		travellers.get(function (err, callbackValue){
			callbackToServer(err, callbackValue);
		});
	}
	else{
		callbackToServer(null, "route please");
	}
}

exports.route = route
