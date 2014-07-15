var pg = require('pg')


function executeGet(){
	pg.connect(process.env.HEROKU_POSTGRESQL_VIOLET_URL , function(err, client, done) {
		//console.log(client)
		client.query('SELECT * FROM post', function(err, result) {
			//console.log("in query");
			//console.log(result);
			if(err){
				return err;
			}
			else{
				return JSON.stringify(result.rows);
			}
		});
		//console.log(client);
		//console.log(done);
	});
}

exports.executeGet = executeGet