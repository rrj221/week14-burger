// var bodyParser = require('body-parser');
var orm = require(__dirname+'/../config/orm.js');


module.exports = function (app) {
	//home page
	app.get('/index', function (req, res) {
		res.render('index.handlebars');
	});

	//add a burger
	app.post('/create', function (req, res) {
		orm.insertOne(req, orm, function(toHandlebars) {
			res.render('index.handlebars', toHandlebars)
		});
	});

	//devour a burger
	app.post('/devour', function (req, res) {
		var devouredId = req.body.id;

		orm.updateOne(req, orm, devouredId, function(toHandlebars) {
			res.render('index.handlebars', toHandlebars);
		});
	});
}