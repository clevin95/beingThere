var pg = require('pg')

function get(callback){
	pg.connect(process.env.HEROKU_POSTGRESQL_VIOLET_URL , function(err, client, done) {
		client.query('SELECT * FROM post', function(err, result) {
			if(err){
				callback(err, null);
			}
			else{
				var postRows = JSON.stringify(result.rows);
				callback(null, postRows);
			}
		});
	});
}

exports.get = get


