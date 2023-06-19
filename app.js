const express = require('express');
const mysql = require('mysql');

// create connection
const db = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b821f9605c65b7',
    password: '7dc64a05',
    // database: 'cleardb-concave-15040'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected ...');
})

const app = express();

app.listen('3000', () => {
    console.log("Server started on port 3000")
})