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
                'SELECT m.music_ID, music_title, AVG(rank) as avg_rank ' +
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
                'SELECT m.music_ID, music_title, ave_rank as avg_rank ' +
                'FROM `spotify_rank` f ' +
                'JOIN `music_info` m ' +
                'ON f.music_ID = m.music_ID ' +
                'GROUP BY f.music_ID ASC ' +
                'ORDER BY f.ave_rank LIMIT 10; ',
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
exports.getTop10FanArtists = function(req, res) {
    const sqlPool = getDBInstance();
    
    // Acquire a connection from the pool
    sqlPool.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring connection from pool:', err);
            res.status(500).json({ error: 'Failed to retrieve data' });
        } else {
            // Execute the query using the acquired connection
            connection.query(
                'SELECT f.artist_ID, artist_name, AVG(rank) as avg_rank '+
                'FROM `fan_artist_rank` f '+
                'JOIN `artist` a '+
                'ON f.artist_ID = a.artist_ID '+
                'GROUP BY artist_ID '+
                'ORDER BY AVG(rank) LIMIT 10;',
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
// @route       GET /getTop10SpotifyArtists
// @access      Public
exports.getTop10SpotifyArtists = function(req, res) {
    const sqlPool = getDBInstance();
    
    // Acquire a connection from the pool
    sqlPool.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring connection from pool:', err);
            res.status(500).json({ error: 'Failed to retrieve data' });
        } else {
            // Execute the query using the acquired connection
            connection.query(
                'SELECT t1.artist_ID, artist_name, avg_ave_rank  '+
                'FROM artist  '+
                'JOIN ( '+
                '    SELECT m.artist_ID as artist_ID, AVG(f.music_ID) as avg_ave_rank  '+
                '    FROM `spotify_rank` f  '+
                '    JOIN `music_info` m  '+
                '    ON f.music_ID = m.music_ID  '+
                '    GROUP BY artist_ID  '+
                '    ORDER BY AVG(f.music_ID) LIMIT 10 ) AS t1 '+
                'ON t1.artist_ID = artist.artist_ID; ',
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


// @desc        Post user ranking
// @route       POST /insertUserRanking
// @access      Public
// @param       {number} req.body.musicID - The ID of the music
// @param       {number} req.body.rank - The rank for the music
exports.insertUserRanking = function(req, res) {
    const sqlPool = getDBInstance();

    const { musicID, rank } = req.body;
    
    // Acquire a connection from the pool
    sqlPool.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring connection from pool:', err);
            res.status(500).json({ error: 'Failed to retrieve data' });
        } else {
            // Execute the query using the acquired connection
            connection.query(
                'INSERT INTO `fan_music_rank` (`music_ID`, `rank`) VALUES (?, ?);',
                [musicID, rank],
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


// @desc        Search for songs or artists
// @route       GET /search
// @access      Public
// @param       {string} req.body.term - The search term
exports.search = function(req, res) {
    const sqlPool = getDBInstance();

    const { term } = req.query;
    
    sqlPool.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring connection from pool:', err);
            res.status(500).json({ error: 'Failed to retrieve data' });
        } else {
            connection.query(
                'SELECT m.music_ID, m.music_title, a.artist_name ' +
                'FROM `music_info` m ' +
                'JOIN `artist` a ON m.artist_ID = a.artist_ID ' +
                'WHERE m.music_title LIKE ? OR a.artist_name LIKE ?; ',
                [`%${term}%`, `%${term}%`],
                (error, results, fields) => {
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

