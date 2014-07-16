var pg = require('pg')

function get (callback){
	console.log("will connect to database");
	pg.connect(process.env.HEROKU_POSTGRESQL_VIOLET_URL , function(err, client, done) {
		console.log("will begin get request");
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

function post (dataDic, callback){
	console.log("in posts.post");
	var test = JSON.stringify(dataDic);
	var content = dataDic['content'];
	var image = dataDic['image'];
	var rate = dataDic['image'];
	var longitude = parseFloat(dataDic['longitude']); 
	var latitude = parseFloat(dataDic['latitude']);
	console.log(image);
	pg.connect(process.env.HEROKU_POSTGRESQL_VIOLET_URL , function(err, client, done) {
		client.query('INSERT INTO post (content,image,rate,longitude,latitude) VALUES ($1, $2, $3, $4, $5)',[content,image,0,longitude,latitude]);
		callback(null, "success");
	});
}

exports.post = post


