var pg = require('pg')
var databaseURL = process.env.HEROKU_POSTGRESQL_VIOLET_URL
var localDB = "postgres://localhost:5432/localherokudb"


function get (callback){
	pg.connect(databaseURL , function(err, client, done) {
		if (err){
			console.log(err)
			throw err;
		}
		client.query ('SELECT * FROM post', function (err, result) {
			if(err){
				console.log("erroR!")
				callback(err, null);
			}
			else{
				var postRows = JSON.stringify(result.rows);
				callback(null, postRows);
			}
		});
		done();
	});
}

exports.get = get

function getPostsForTraveller (travellerID, callback){
	console.log("will connect to database");
	
	pg.connect(databaseURL , function(err, client, done) {
		console.log("will begin get request");
		if (err){
			console.log(err)
			throw err;
		}
		client.query ('SELECT * FROM post WHERE poster_id = $1',[travellerID], function (err, result) {
			if(err){
				console.log("erroR!")
				callback(err, null);
			}
			else{
				var postRows = JSON.stringify(result.rows);
				callback(null, postRows);
			}
		});
		done();
	});
}

exports.getPostsForTraveller = getPostsForTraveller;

function post (dataDic, travellerID, callback){
	console.log("in posts.post");
	var test = JSON.stringify(dataDic);
	var content = dataDic['content'];
	var image = dataDic['image'];
	var rate = dataDic['image'];
	var longitude = parseFloat(dataDic['longitude']); 
	var latitude = parseFloat(dataDic['latitude']);
	console.log(image);
	pg.connect(databaseURL , function(err, client, done) {
		client.query('INSERT INTO post (content,image,rate,longitude,latitude, poster_id) VALUES ($1, $2, $3, $4, $5, $6)',[content,image,0,longitude,latitude,travellerID]);
		callback(null, "success");
		done()
	});
}

exports.post = post

/*
function postPostForTraveller (dataDic, travellerID, callback){
	console.log("in posts.post");
	var test = JSON.stringify(dataDic);
	var content = dataDic['content'];
	var image = dataDic['image'];
	var rate = dataDic['image'];
	var longitude = parseFloat(dataDic['longitude']); 
	var latitude = parseFloat(dataDic['latitude']);
	console.log(image);
	pg.connect(databaseURL , function(err, client, done) {
		client.query('INSERT INTO post (content,image,rate,longitude,latitude, poster_id) VALUES ($1, $2, $3, $4, $5, $6)',[content,image,0,longitude,latitude,travellerID]);
		callback(null, "success");
	});
}

exports.postPostForTraveller = postPostForTraveller;
*/

