var makeGet = require("./makeGet");
var makePost = require("./makePost");

function route (pathname){
	console.log(pathname);
	makePost.executePost();
	makeGet.executeGet();
}

exports.route = route