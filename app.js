const express = require('express');
const mysql = require('mysql');

// routers //
const musicRouter = require('./routes/musicRoute');

// db connection //
const db = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b821f9605c65b7',
    password: '7dc64a05'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected ...');
})

// app //

const app = express();

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies


app.use("/", musicRouter);


app.listen('3000', () => {
    console.log("Server started on port 3000")
})