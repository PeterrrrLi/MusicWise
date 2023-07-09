const { getDBInstance } = require('../database/db_init');


// @desc        Get Top 10 songs by Rank
// @route       GET /getTop10FanRank
// @access      Public
exports.getTop10FanRank = function(req, res) {
    const sqlPool = getDBInstance();
    
    // Acquire a connection from the pool
    sqlPool.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring connection from pool:', err);
            res.status(500).json({ error: 'Failed to retrieve data' });
        } else {
            // Execute the query using the acquired connection
            connection.query(
                'SELECT music_ID, music_title, AVG(rank) as avg_rank ' +
                'FROM `fan_music_rank` f ' +
                'JOIN `music_info` m ' +
                'ON f.music_ID = m.music_ID ' +
                'GROUP BY f.music_ID ASC ' +
                'ORDER BY AVG(rank) LIMIT 10; ',
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

// @desc        Get Top 10 songs by SpotifyRank
// @route       GET /getTop10SpotifyRank
// @access      Public
exports.getTop10SpotifyRank = function(req, res) {
    const sqlPool = getDBInstance();
    
    // Acquire a connection from the pool
    sqlPool.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring connection from pool:', err);
            res.status(500).json({ error: 'Failed to retrieve data' });
        } else {
            // Execute the query using the acquired connection
            connection.query(
                'SELECT music_ID, music_title, ave_rank as avg_rank ' +
                'FROM `spotify_rank` f ' +
                'JOIN `music_info` m ' +
                'ON f.music_ID = m.music_ID ' +
                'GROUP BY f.music_ID ASC ' +
                'ORDER BY f.ave_rank; ',
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


// @desc        Get Top 10 artists by Rank
// @route       GET /getTop10Artists
// @access      Public
exports.getTop10Artists = function(req, res) {
    const sqlPool = getDBInstance();
    
    // Acquire a connection from the pool
    sqlPool.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring connection from pool:', err);
            res.status(500).json({ error: 'Failed to retrieve data' });
        } else {
            // Execute the query using the acquired connection
            connection.query(
                'SELECT f.artist_ID, artist_name, AVG(rank) as avg_rank FROM `fan_artist_rank` f JOIN `artist` a ON f.artist_ID = a.artist_ID GROUP BY artist_ID  ORDER BY AVG(rank) LIMIT 20;',
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

// @desc        Get All songs
// @route       GET /getAllSongs
// @access      Public
exports.getAllSongs = function(req, res) {
    const sqlPool = getDBInstance();
    
    // Acquire a connection from the pool
    sqlPool.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring connection from pool:', err);
            res.status(500).json({ error: 'Failed to retrieve data' });
        } else {
            // Execute the query using the acquired connection
            connection.query(
                'SELECT music_ID, music_title FROM `music_info` m JOIN (SELECT a.artist_ID, artist_name, AVG(rank) as avg_rank  FROM `fan_artist_rank` f JOIN `artist` a  ON f.artist_ID = a.artist_ID GROUP BY f.artist_ID  ORDER BY AVG(rank)) c ON m.artist_ID = c.artist_ID;',
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

