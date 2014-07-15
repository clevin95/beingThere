var http = require('http')
var url = require('url')
var pg = require('pg')

function start(route){
	var server = http.createServer(function (request, response){
		response.writeHead(200, {'Content-Type':'application/json'});
		var method = request.method
		var	reqUrl = request.url
		var path = url.parse(reqUrl).pathname
		
		//route(path);
		//response.write(request)
		request.on("data", function(chunk){
			console.log(chunk.toString());
			console.log("\n\n\n");
			response.write(chunk.toString())
		})
		request.on("end", function(end){
			response.end()
		})
		/*
		var requestType = request['method'];
		if (requestType == 'GET'){
			console.log('hello')
			//response.write('hello')
		}
		else if (requestType == 'POST'){
			request.on("data", function (chunk){
				//response.write(chunk.toString())
			})
		})
		response.writeHead(200, {'Content-Type':'Json'})
		var pathname = url.parse(request.url).pathname
		response.end('test')
		*/
	})
	var port = Number(process.env.PORT || 5000);
	server.listen(port, function() {
		console.log("Listening on " + port);
	});
}

exports.start = start


