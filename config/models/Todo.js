var mysql = require('mysql');
var conn = {};

module.exports = { 
    con : function(){
    	var connection = mysql.createConnection({
			host     : '127.0.0.1',
	    	database : "stok",
	    	user     : 'root',
	    	password : ''
	    });

	    connection.connect(function(err) {
		  if (err) {
		    console.error('error connecting: ' + err.stack);
		    return;
		  }

		  console.log('connected as id ' + connection.threadId);
		});

	    return connection;
    },
 
};

 