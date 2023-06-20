const { getDBInstance } = require('../../src/database/db_init');


// @desc        Get Top 10 songs by Rank
// @route       GET /getTop10
// @access      Public
exports.getTop10 = function(req, res) {
    const sqlPool = getDBInstance();
    
    // Acquire a connection from the pool
    sqlPool.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring connection from pool:', err);
            res.status(500).json({ error: 'Failed to retrieve data' });
        } else {
            // Execute the query using the acquired connection
            connection.query(
                'SELECT music_ID, AVG(rank) as avg_rank FROM `fan_music_rank` GROUP BY music_ID ORDER BY AVG(rank) LIMIT 10',
                (error, results, fields) => {
                    // Release the connection back to the pool
                    connection.release();

                    if (error) {
                        console.error('Error executing query:', error);
                        res.status(500).json({ error: 'Failed to retrieve data' });
                    } else {
                        res.status(200).json(results);
                    }
                }
            );
        }
    });
};


// @desc        test
// @route       GET /hello
// @access      Public
exports.hello = function(req, res) {
    res.status(200).json({"message:":"hello world"});              
};

