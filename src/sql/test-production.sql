-- tFeature 1: op 10 music by average fan rank
SELECT m.music_ID, music_title, AVG(rank) as avg_rank
FROM `fan_music_rank` f
JOIN `music_info` m
ON f.music_ID = m.music_ID
GROUP BY f.music_ID ASC
ORDER BY AVG(rank) LIMIT 10;

-- Feature 2: top 10 music by average Spotift rank
SELECT m.music_ID, music_title, ave_rank as avg_rank
FROM `spotify_rank` f
JOIN `music_info` m
ON f.music_ID = m.music_ID
WHERE f.ave_rank != 0
GROUP BY f.music_ID
ORDER BY f.ave_rank LIMIT 10;

-- Feature 3: top 10 artist ID, artist name, and average Fan rating
SELECT f.artist_ID, artist_name, AVG(rank) as avg_rank
FROM `fan_artist_rank` f 
JOIN `artist` a 
ON f.artist_ID = a.artist_ID 
GROUP BY artist_ID 
ORDER BY AVG(rank)  LIMIT 10;

-- Feature 4: top 10 artist by average Spotity rank
SELECT t1.artist_ID, artist_name, avg_ave_rank 
FROM artist 
JOIN (
	SELECT m.artist_ID as artist_ID, AVG(f.ave_rank) as avg_ave_rank 
	FROM `spotify_rank` f 
	JOIN `music_info` m 
	ON f.music_ID = m.music_ID 
    WHERE f.ave_rank != 0
	GROUP BY artist_ID 
	ORDER BY AVG(f.ave_rank) ) AS t1
ON t1.artist_ID = artist.artist_ID
limit 10;

-- Feature 6: search by song name or artist name
SELECT m.music_ID, m.music_title, a.artist_name
FROM `music_info` m
JOIN `artist` a ON m.artist_ID = a.artist_ID
WHERE m.music_title LIKE ? OR a.artist_name LIKE ?; 

-- other tests --

SELECT music_ID, music_title
FROM `music_info` m
JOIN
(SELECT a.artist_ID, artist_name, AVG(rank) as avg_rank 
FROM `fan_artist_rank` f
JOIN `artist` a 
ON f.artist_ID = a.artist_ID
GROUP BY f.artist_ID 
ORDER BY AVG(rank) LIMIT 5) c
ON m.artist_ID = c.artist_ID;


SELECT s.music_ID, m.music_title, s.ave_rank as Spotify_Rank, ave_rank as Fan_Rank
FROM spotify_rank s 
JOIN fan_music_rank f ON s.music_ID = f.music_ID
JOIN music_info m ON s.music_ID = m.music_ID;


INSERT INTO fan_music_rank (music_ID, rank)
VALUES (2, 100);
SELECT * FROM fan_music_rank;


SELECT *
FROM music_info mi NATURAL JOIN artist a NATURAL JOIN music_age ma NATURAL JOIN spotify_rank sr
WHERE a.artist_name LIKE '%Trippie%'
ORDER BY music_title ASC;












