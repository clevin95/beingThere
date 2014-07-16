var pg = require('pg');

function get(callback){
	pg.connect(process.env.HEROKU_POSTGRESQL_VIOLET_URL , function(err, client, done) {
		client.query('SELECT * FROM travellers', function(err, result) {
			if(err){
				callback(err, null);
				callback(err, null);
			}
			else{
				var travellerRows = JSON.stringify(result.rows);
				callback(null, travellerRows);
			}
		});
		done();
	});
}

exports.get = get