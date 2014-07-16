var pg = require('pg')


function executePost(){
	var username = "Jonny";
	var hometown = "Mars";
	var profilepic = null;
	var status = 1;

	

	request.on('end', function() {
		var dicToMake = {};
		var dataArray = postData.split('&');
		for (i = 0; i < dataArray.length ; i++){
			var arrayElement = dataArray[i];
			var splitElement = arrayElement.split('=')
			dicToMake[splitElement[0]] = splitElement[1];
			//dicToMake.push({key: splitElement[0], value: splitElement[1]});
	}
	callbackToServer(null, postData);
	});
	pg.connect(process.env.HEROKU_POSTGRESQL_VIOLET_URL , function(err, client, done) {
		if (err){
			return
		}
		//client.query('INSERT INTO travellers (username,hometown,profilepicture,status) VALUES ($1, $2, $3, $4)',[username,hometown,profilepic, status]);
		client.query('INSERT INTO post (content) VALUES ($1)',['test post']);
	});
}

exports.executePost = executePost