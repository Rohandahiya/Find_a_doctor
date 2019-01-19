var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mysql = require('mysql2')

var routes = require('./routes/index');
var doctors = require('./routes/doctors');
var categories = require('./routes/categories');

var app = express();

var connection = mysql.createConnection({
	host: 'localhost',
	database: 'findadoc',
	user: 'Hospital',
	password: 'Rohan@007'
});

connection.connect();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

var query =  connection.query("SELECT * FROM categories",function(err,results){
    if(err) throw err;
	app.locals.cats = results ;
}
)

app.use('/', routes);
app.use('/doctors', doctors);
app.use('/categories', categories);

app.set('port', (process.env.PORT || 5970));

app.listen(app.get('port'), function(){
	console.log('Server started on port: '+app.get('port'));
});
