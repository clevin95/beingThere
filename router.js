var makeGet = require("./makeGet");
var makePost = require("./makePost");
var posts = require("./posts.js");
var travellers = require("./travellers");
var url = require("url");

function route (request, callbackToServer)
{
	var	reqUrl = request.url;
	var pathname = url.parse(reqUrl).pathname;
	var pathComponents = breakDownPathName(pathname);

	if (pathComponents[0] === "travellers")
	{
		routeTraveller(request, pathComponents, callbackToServer)
	}
	else 
	{
		callbackToServer("route please", null);
	}
}

exports.route = route



function routeTraveller (request, pathComponents, callbackToServer)
{
	var method = request.method;
	console.log(pathComponents)
	if (pathComponents.length === 1)
	{
	 	if (method === "GET")
	 	{
	 		jumpToTravellersGet(callbackToServer);
	 	}
		else if (method === "POST")
		{
			postToTravellers(request, callbackToServer);
		}
		else if (method === "PUT"){
			validateUser(request, callbackToServer);
		}
	}	
	else
	{
		if (pathComponents.length == 2)
		{
			if (pathComponents[1] === "posts")
			{
				jumpToPostsGet(callbackToServer);
			}
			else 
			{
				var travellerID = parseInt(pathComponents[1]);
				jumpToSingleTravellerGet(travellerID, callbackToServer);
			}
		}
		else if (pathComponents.length == 3){
			var travellerID = parseInt(pathComponents[1]);
			if (method === "GET"){
				if (pathComponents[2] === "posts")
				{
					jumpPostsForTravellerGet(travellerID, callbackToServer);
				}
			}
			else if (method === "POST"){
				postPostForTraveller(travellerID, request, callbackToServer);
			}
		}
	}
}

function validateUser (request, callbackToServer)
{
	breakDownPost(request, function(dataDic){
		travellers.validateUsernamePassword(dataDic, function (err, callbackValue){
	 		callbackToServer(err, callbackValue.toString());
		});
	});
}

function jumpToTravellersGet(callbackToServer)
{
	travellers.get(function (err, callbackValue){
		callbackToServer(err, callbackValue);
	});
}

function jumpToSingleTravellerGet(travellerID, callbackToServer)
{
	travellers.getTraveller(travellerID, function (err, callbackValue){
		callbackToServer(err, callbackValue);
	});
}

function postToTravellers(request, callbackToServer){
	breakDownPost(request, function(dataDic){
		travellers.post(dataDic, function (err, callbackValue){
	 		callbackToServer(err, callbackValue.toString());
		});
	});
}

function jumpToPostsGet(callbackToServer)
{
	posts.get(function (err, callbackValue){
		callbackToServer(err, callbackValue);
	});
}

function jumpPostsForTravellerGet(travellerID, callbackToServer)
{
	posts.getPostsForTraveller(travellerID, function (err, callbackValue){
		callbackToServer(err, callbackValue);
	});
}


function postPostForTraveller(travellerID, request, callbackToServer)
{
	breakDownPost(request, function(dataDic){
		posts.post(dataDic, travellerID, function (err, callbackValue){
			callbackToServer(err, callbackValue.toString());
		});
	});
}


function breakDownPathName(pathname)
{
	var allElements = [];
	var stringToAdd = ""
	for (i = 1; i < pathname.length; i++){
		var character = pathname[i];
		if (character == '/'){
			allElements.push(stringToAdd);
			stringToAdd = ""
		}else{
			stringToAdd += character;
		}
	}
	allElements.push(stringToAdd);
	return allElements;
}


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
