var path = require('path');
var rootPath = path.normalize(__dirname + '/../'); // normalizes to base path

module.exports = {
	development: {
		rootPath: rootPath,
		host     : '127.0.0.1',
    	database : "stok",
    	user     : 'root',
    	password : '',
    	port: process.env.PORT || 8080
	},
	production: {
		    	host     : process.env.MYSQL_ADDON_HOST,
		    	database : process.env.MYSQL_ADDON_DB,
		    	user     : process.env.MYSQL_ADDON_USER,
		    	password : process.env.MYSQL_ADDON_PASSWORD,
		    	port: process.env.PORT || 8080
	}

};