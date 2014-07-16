var makeGet = require("./makeGet");
var makePost = require("./makePost");
var posts = require("./posts.js");
var travellers = require("./travellers");
var url = require("url");

function route (request, callbackToServer){
	var method = request.method;
	var	reqUrl = request.url;
	var pathname = url.parse(reqUrl).pathname;
	console.log("in router");
	if (method === "GET"){
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
	}
	else if (method === "POST"){
		breakDownPost(request, function(dataDic){
			console.log(dataDic);
			if (pathname == "/posts"){
				posts.post(dataDic, function (err, callbackValue){
 					callbackToServer(err, callbackValue.toString());
				});
			}
			else{
				callbackToServer(null, "route please");
			}
		});
	}
	else{
		callbackToServer(null, "route please");
	}
}

exports.route = route

function breakDownPost(request, callbackToRoute){
	var postData = '';
	request.on('data', function(data){
		postData += data;
	});
	request.on('end', function() {
		var dicToMake = {};
		var dataArray = postData.split('&');
		for (i = 0; i < dataArray.length ; i++){
			var arrayElement = dataArray[i];
			var splitElement = arrayElement.split('=');
			dicToMake[splitElement[0]] = splitElement[1];
		}
		callbackToRoute(dicToMake);
	});
}