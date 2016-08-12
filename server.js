//boiler plate
////////////////////////////////////////////////////////////////////////////////////

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mysql = require('mysql');
var exphbs = require('express-handlebars');


var connectionFile = require(__dirname+'/config/connection.js');
var router = require(__dirname+'/controllers/burgers_controller.js');

//set up app
var app = express();

//Serve static content for the app from the "public" directory in the application directory.
app.use('/static', express.static(__dirname + '/public'));

//define PORT
var PORT = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// use method override
app.use(methodOverride('_method'));

//use handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//connect to the database
var connection =  connectionFile.connect(mysql);
// connectionFile.main.defineConnection(mysql);
// console.log(connectionFile.main.connection);

// connectionFile.main.connect();


//   var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'burgers_db'
//   });
console.log(connection);


//end of boiler plate
////////////////////////////////////////////////////////////////////////////////////


//ROUTES/////////////////
router.runRoutes(app, connection);







//LISTEN
app.listen(PORT, function () {
  console.log('app now listening on PORT', PORT);
});





