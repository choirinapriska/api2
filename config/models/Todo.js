var mysql = require('mysql');
var conn = {};

module.exports = { 
    con : function(){
    	var connection = mysql.createConnection({
			// host     : '127.0.0.1',
	  //   	database : "stok",
	  //   	user     : 'root',
	  //   	password : ''
	  		host     : process.env.MYSQL_ADDON_HOST,
	    	database : process.env.MYSQL_ADDON_DB,
	    	user     : process.env.MYSQL_ADDON_USER,
	    	password : process.env.MYSQL_ADDON_PASSWORD
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

 