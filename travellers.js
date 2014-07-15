var pg = require('pg');

function get(callback){
	pg.connect(process.env.HEROKU_POSTGRESQL_VIOLET_URL , function(err, client, done) {
		client.query('SELECT * FROM travellers', function(err, result) {
			if(err){
			 	console.log(err)
				callback(err);
			}
			else{
				var travellerRows = JSON.stringify(result.rows);
				console.log(travellerRows);
				callback(travellerRows);
			}
		});
	});
}

exports.get = get