var connection = require(__dirname+'/connection.js');

module.exports = {
	selectAll: function (callback) {
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

					callback(toHandlebars);
				});
			});
	},
	insertOne: function (req, orm, callback) {
		connection.query('INSERT INTO burgers (burger_name, devoured) \
						VALUES (?, false)', req.body.burger, function (err, result) {	
			if (err) throw err;
			orm.selectAll(callback);
		});
	}, 
	updateOne: function (req, orm, devouredId, callback) {
		connection.query('UPDATE burgers SET ? WHERE ?', [{
			devoured: true
		}, {
			id: devouredId
		}], function (err, result) {
			if (err) throw err;
			orm.selectAll(callback);
		});
	}
};