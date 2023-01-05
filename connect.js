const mysql = require('mysql');

let connection = mysql.createConnection({
    host : 'localhost',
    user : 'CRUDuser',
    password: 'crud123',
    database: 'cruduserinfo'
});

connection.connect(function(err){
    if(err)
    {
        return console.error('error ' + err.message);
    }

    console.log('Connect to the Database');
});

module.exports = connection;