const express = require('express');
const { dbInit } = require('./database/db_init');
const mysql = require('mysql');

// routers //
const musicRouter = require('./routes/musicRoute');

// Connect to database
dbInit()

const app = express();

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies


app.use("/", musicRouter);

app.listen('3000', () => {
    console.log("Server started on port 3000")
})
