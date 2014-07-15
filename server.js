var http = require('http');

var pg = require('pg');

function start(route){
	var server = http.createServer(function (request, response){
		response.writeHead(200, {'Content-Type':'application/json'});
		route(request, function (callbackValue){
			response.write(callbackValue);
			response.end();
		});
	});
	var port = Number(process.env.PORT || 5000);
	server.listen(port, function() {
		console.log("Listening on " + port);
	});
}

exports.start = start
