var http = require('http')
var url = require('url')

var server = http.createServer(function (request, response){
	response.writeHead(200, {'Content-Type':'application/json'});
	response.write('test')
	response.end()
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







/*
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
res.send('Hello World!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
console.log("Listening on " + port);
});
*/