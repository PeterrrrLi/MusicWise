const mysql = require('mysql');

class Database {
  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: 1000,
      host: 'us-cdbr-east-06.cleardb.net',
      user: 'b821f9605c65b7',
      password: '7dc64a05',
      database: 'heroku_54e3f38f2db2aeb'
    });
  }
}

// Create a singleton instance of the Database class

let dbInstance = undefined; 

const dbInit = () => {
    dbInstance = new Database();
}

const getDBInstance = () => {
    return dbInstance
}

module.exports = {dbInit,getDBInstance};