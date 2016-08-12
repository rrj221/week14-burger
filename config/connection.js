
var main = {
	connection: null, 
	defineConnection: function (mysql) {
		//define database connection
		this.connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'burgers_db'  
		});
		// console.log('1',this.connection);
	}, 
	connect: function () {
		// console.log('2',this.connection);
		//connect to the database
		this.connection.connect(function(err) {
		  if (err) {
		    console.error('error connecting: ' + err.stack);
		    return;
		  };
		  console.log('3'+this.connection);
		  console.log('connected as id ' + connection.threadId);

		});
	}
};

var connect = function (mysql) {
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'burgers_db'
	});

	connection.connect(function(err) {
	  if (err) {
	    console.error('error connecting: ' + err.stack);
	    return;
	  };

	  console.log('connected as id ' + connection.threadId);

	});
	console.log(connection);
	return connection;
}





module.exports.main = main;
module.exports.connect = connect;