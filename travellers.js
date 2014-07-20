var pg = require('pg');
var databaseURL =  process.env.HEROKU_POSTGRESQL_VIOLET_URL; 
var remoteDB = "postgres://localhost:5432/localherokudb";

function get (callback){
	pg.connect(databaseURL , function(err, client, done) {
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


function post (dataDic, callback){
	// remote database url = process.env.HEROKU_POSTGRESQL_VIOLET_URL
	var test = JSON.stringify(dataDic);
	var username = dataDic['username'];
	var password = dataDic['password'];
	pg.connect(databaseURL , function(err, client, done) {
		if (err){
			callback(err, null);
		}
		client.query('INSERT INTO travellers (username, password) VALUES ($1, $2) RETURNING unique_id',[username, password], function (err, result){
			var unique_id = result.rows[0];
			callback(null, JSON.stringify(unique_id));
			done();
		});
	});
}

exports.post = post;

function getTraveller (travellerID, callback){
	pg.connect(databaseURL , function (err, client, done) {
		client.query('SELECT * FROM travellers WHERE unique_id = $1',[travellerID], function(err, result) {
			if(err){
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

exports.getTraveller = getTraveller;

function validateUsernamePassword (dataDic, callback)
{
	var username = dataDic['username'];
	var password = dataDic['password'];
	var errorDic = {};
	pg.connect(databaseURL, function (err, client, done){
		client.query('SELECT * FROM travellers WHERE username = $1',[username], function (err, result){
			console.log("validating");
			var user = result.rows[0];
			if (err){
				callback(err, null);
				done()
			}
			//there are no matching usernames
			else if (result.rows.length == 0){
				var response = 'username ' + username + ' not found';
				errorDic['error'] = response;
				callback(null, JSON.stringify(errorDic));
				done()
			}
			//login was succesfull
			else if (user['password'] === password){
				callback(null, JSON.stringify(user));
				done()
			}
			//the password does not match
			else {
				errorDic['error'] = 'invalid password';
				callback(null, JSON.stringify(errorDic));
				done()
			}
			done()
		});
	});
}

exports.validateUsernamePassword = validateUsernamePassword;



function checkPasswordPair (inputPassword, storedPassword)
{
	if (inputPassword === storedPassword){
		return true;
	}
	return false;
}





