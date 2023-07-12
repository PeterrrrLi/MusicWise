# Top-Music-Database-APP

## Goals
HipHopHierarchy is a highly interactive, **database**-driven, **RESTful** web-based application for hip-hop fans with **MySQL**, **Node.js** backend and **React** frontend, deployed onto **Heroku**. It allows users to explore and rank songs and artists from the Spotify Top 10000 Streamed Songs dataset. The application provides detailed song and artist information and fosters a fan-based ranking system, merging mainstream popularity with niche preferences. 

### Currently Supported Features:  
#### Search for songs & artists
Users are able to search for specific songs using the search bar on the home page. The results shown will contain the user input in either the `song title` or the `artist name`
<img width="1577" alt="Screen Shot 2023-07-11 at 7 25 22 PM" src="https://github.com/PeterrrrLi/Top-Music-Database-APP/assets/66461994/93d5e833-b350-4b18-85db-dc23295ebaab">

#### Display User Song Ranking
On the Top 10 Songs page, a table containing top 10 User Ranked Song results will show, with song title and rank in each entry.
<img width="1148" alt="song fan rank" src="https://github.com/PeterrrrLi/Top-Music-Database-APP/assets/66461994/ff16a9ba-1259-4dea-986e-eeca663e2e62">


#### Display Spotify Song Ranking
On the Top 10 Songs page, a table containing top 10 Spotify Ranked Song results will show, with song title and rank in each entry. Together with the top 10 User Ranked Song table, they illustrate the difference in the preference of our users and official Spotify rankings.
<img width="1148" alt="spotify rank" src="https://github.com/PeterrrrLi/Top-Music-Database-APP/assets/66461994/a6a8e90f-d83f-4154-a6d3-63b696b78a1f">



#### Display User Artist Ranking
On the Top 10 Artists page, a table containing top 10 User Ranked Artist results will show, with Artist name and rank in each entry.
<img width="1337" alt="fan artist rank" src="https://github.com/PeterrrrLi/Top-Music-Database-APP/assets/66461994/93f85d63-b119-494c-8278-67da37703f09">

#### Display Spotify Artist Ranking
On the Top 10 Artists page, a table containing top 10 Spotify Artist results will show, with Artist name and rank in each entry. This will be just besides the User Artist Ranking table, showcasing the difference between the official ranking and our app's user ranking.
<img width="1337" alt="spotify artist rank" src="https://github.com/PeterrrrLi/Top-Music-Database-APP/assets/66461994/c16d399d-c18e-40de-9d77-ae3fd4cd706f">

#### Submit User Rankings
Click on the music title displayed in the search results, a popup window will display for the user to check song information and submit rankings
<img width="1297" alt="Screen Shot 2023-07-11 at 9 22 08 PM" src="https://github.com/PeterrrrLi/Top-Music-Database-APP/assets/66461994/e54bb7f3-8640-4c95-9004-52d398d1cac1">
<img width="1297" alt="Screen Shot 2023-07-11 at 9 22 53 PM" src="https://github.com/PeterrrrLi/Top-Music-Database-APP/assets/66461994/525d8ae3-1d65-48e2-b48d-21b2b9e6fd57">



#### All Songs
This feature serves the purpose to display all music in our database to users to browse
<img width="1337" alt="Screen Shot 2023-07-11 at 9 18 48 PM" src="https://github.com/PeterrrrLi/Top-Music-Database-APP/assets/66461994/88b494f8-e4a3-4fa8-ae9b-9fac2f36bfb6">

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
