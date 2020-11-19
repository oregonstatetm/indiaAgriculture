var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit : 10,
	host            : 'classmysql.engr.oregonstate.edu',
	user            : 'cs_340chopras',
	password        : '1227',
	database        : 'cs340_chopras'
});
module.exports.pool = pool;
