var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

exports.runRoutes = function (app, connection) {
	//home page
	app.get('/index', function (req, res) {
		console.log('youre at the home page');
		res.render('index.handlebars');
	});

	app.post('/create', function (req, res) {
		console.log('you sent', req.body.burger);
		
		connection.query('INSERT INTO burgers (burger_name, devoured) \
						VALUES (?, false)', req.body.burger, function (err, result) {	
			if (err) throw err;
			console.log(result);

			console.log('you did send', req.body.burger);

			// var data = {
			// 	burger: req.body.burger
			// }

			// connection.query('SELECT * FROM burgers WHERE ? ORDER BY id ASC', {
			// 	devoured: false
			// }, function(err, result) {
			// 	if (err) throw err;
			// 	res.render('index.handlebars', {burgers: result});
			// });

			connection.query('SELECT * FROM burgers WHERE ? ORDER BY date ASC', {
				devoured: true
			}, function(err, result) {
				if (err) throw err;
				console.log(result);
				var devouredArray = result;
				connection.query('SELECT * FROM burgers WHERE ? ORDER BY id ASC', {
					devoured: false
				}, function (err, result) {
					var notDevouredArray = result;
					var toHandlebars = {
						burgers: notDevouredArray,
						devoured: devouredArray
					};
					res.render('index.handlebars', toHandlebars);
				});
				
			});


		});
	});

	app.post('/devour', function (req, res) {
		console.log('you sent something');
		console.log(req.body);

		var devouredId = req.body.id;
		console.log(devouredId);

		connection.query('UPDATE burgers SET ? WHERE ?', [{
			devoured: true
		}, {
			id: devouredId
		}], function (err, result) {
			if (err) throw err;
			console.log('nice job');
			connection.query('SELECT * FROM burgers WHERE ? ORDER BY date ASC', {
				devoured: true
			}, function(err, result) {
				if (err) throw err;
				console.log(result);
				var devouredArray = result;
				connection.query('SELECT * FROM burgers WHERE ? ORDER BY id ASC', {
					devoured: false
				}, function (err, result) {
					var notDevouredArray = result;
					var toHandlebars = {
						burgers: notDevouredArray,
						devoured: devouredArray
					};
					res.render('index.handlebars', toHandlebars);
				});
				
			});

			// res.render('index.handlebars', {devoured: result});


		})
	});
}