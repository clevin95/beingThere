var http = require('http');
var router = require('./router')


var pg = require('pg');

function start(route){
	var server = http.createServer(function (request, response){
		response.writeHead(200, {'Content-Type':'application/json'});
		route(request, function (err, callbackValue){
			if (err){
				response.write(err.toString());
			}
			else{
				response.write(callbackValue);
			}
			response.end();
		});

	});
	
	var port = Number(process.env.PORT || 5050);
	server.listen(port, function() {
		console.log("Listening on " + port);
	});

}

exports.start = start
