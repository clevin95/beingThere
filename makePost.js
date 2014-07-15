var pg = require('pg')


function executePost(){
	var username = "Jonny"
	var hometown = "Mars"
	var profilepic = null
	var status = 1;
	pg.connect(process.env.HEROKU_POSTGRESQL_VIOLET_URL , function(err, client, done) {
		if (err){
			//console.log(err);
			return
		}
		//client.query('INSERT INTO travellers (username,hometown,profilepicture,status) VALUES ($1, $2, $3, $4)',[username,hometown,profilepic, status]);
		client.query('INSERT INTO post (content) VALUES ($1)',['test post']);
	
	});
}

exports.executePost = executePost