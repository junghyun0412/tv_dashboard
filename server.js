// modules =================================================
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var request = require('request');
var sql = require('mssql');

var app = express();

// configuration ===========================================

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080;


// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url); 

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 


// routes ==================================================
require('./app/routes')(app); // configure our routes


/*
app.get('/', function (req, res) {
	sql.connect("mssql://DEPortal:DEPortalisAwesome!@EBWADESQL01/AdobeAnalytics").then(function() {
		var request = new sql.Request();
		var query = 'select * from genericRepository';
		request.query(query).then(function(recordset) {
			//console.log('Recordset: ' + recordset);
			//console.log('Affected: ' + request.rowsAffected);
			res.status(200).json(recordset);
		}).catch(function(err) {
			console.log('Request error: ' + err);
			res.send('Request error: ' + err);
		});		
	}).catch(function(err) {
		if (err) {
			console.log('SQL Connection Error: ' + err);
			res.send('SQL Connection Error: ' + err);
		}
	});
	//res.send('Hello World');
});
*/

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port, 'localhost');

// shoutout to the user                     
console.log('Listening to port ' + port);

// expose app           
exports = module.exports = app;   
