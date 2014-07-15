var http = require('http');
var url = require('url');
var pg = require('pg');

function start(route){
	var server = http.createServer(function (request, response){
		response.writeHead(200, {'Content-Type':'application/json'});
        response.write('write to sight\n');
		console.log("connected");
		var method = request.method;
		var	reqUrl = request.url;
		var path = url.parse(reqUrl).pathname;
		
		//route(path);
		//response.write(request)
		request.on("data", function(chunk){
			console.log(chunk.toString());
			response.write(chunk.toString())
            
		})
		request.on("end", function(end){
            response.write('write to sight');
			response.end();
		});
	});
	var port = Number(process.env.PORT || 5000);
	server.listen(port, function() {
		console.log("Listening on " + port);
        
	});
}

exports.start = start


