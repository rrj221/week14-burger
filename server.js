var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mysql = require('mysql');
var exphbs = require('express-handlebars');

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

//run the routes
router(app);


//LISTEN
app.listen(PORT, function () {
  console.log('app now listening on PORT', PORT);
});





