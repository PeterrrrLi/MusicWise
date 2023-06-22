const express = require('express');
const cors = require('cors');
const { dbInit } = require('./database/db_init');
const mysql = require('mysql');

const port = process.env.PORT || 8080;

// routers //
const musicRouter = require('./routes/musicRoute');

// Connect to database
dbInit()

// app //

const app = express();


app.use(cors());
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies


app.use("/", musicRouter);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });