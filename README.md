# Top-Music-Database-APP

## Goals
HipHopHierarchy is a highly interactive, **database**-driven, **RESTful** web-based application for hip-hop fans with **MySQL**, **Node.js** backend and **React** frontend, deployed onto **Heroku**. It allows users to explore and rank songs and artists from the Spotify Top 10000 Streamed Songs dataset. The application provides detailed song and artist information and fosters a fan-based ranking system, merging mainstream popularity with niche preferences. 

### Currently Supported Features:  
#### Search for songs & artists
Users are able to search for specific songs using the search bar on the home page. The results shown will contain the user input in either the `song title` or the `artist name`

#### Display User Song Ranking
On the Top 10 Songs page, a table containing top 10 User Ranked Song results will show, with song title and rank in each entry.

#### Display Spotify Song Ranking
On the Top 10 Songs page, a table containing top 10 Spotify Ranked Song results will show, with song title and rank in each entry. Together with the top 10 User Ranked Song table, they illustrate the difference in the preference of our users and official Spotify rankings.

#### Display User Artist Ranking
On the Top 10 Artists page, a table containing top 10 User Ranked Artist results will show, with Artist name and rank in each entry.

#### Display Spotify Artist Ranking
On the Top 10 Artists page, a table containing top 10 Spotify Artist results will show, with Artist name and rank in each entry. This will be just besides the User Artist Ranking table, showcasing the difference between the official ranking and our app's user ranking.

#### Submit User Rankings
Click on the music title displayed in the search results, a popup window will display for the user to check song information and submit rankings<img width="836" alt="Screen Shot 2023-07-11 at 4 00 17 PM" src="https://github.com/PeterrrrLi/Top-Music-Database-APP/assets/66461994/1a7a5c5c-d11c-42cb-b6e6-bdf173ec1077">


## Backend stack
JavaScript, Node.js, Express.js 

## Database stack
MySql, ClearDB

## Cloud Platform
Heroku
AWS

## Dataset
Spotify Top 10000 Streamed Songs on Kaggle (https://www.kaggle.com/datasets/rakkesharv/spotify-top-10000-streamed-songs)
Spotify API

## Start App
1.  `cd client` to go to frontend directory,  <br />
2.  install dependencies with `npm i`,  <br />
3.  run the app using `npm start` 
