var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit : 10,
	host            : 'us-cdbr-east-02.cleardb.com',
	user            : 'b46a461f5e3a4c',
	password        : '7c95039b',
	database        : 'heroku_9a471125d48dd35',
});
module.exports.pool = pool;
