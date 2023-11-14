const mysql = require('mysql2');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mern',
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) {
        console.log(`Something wrong in database: ${err}`)

    } else {
        console.log('Connected to the database');
    }

});

module.exports = db;
