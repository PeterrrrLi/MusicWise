import logo from '../resorce/rapper.jpg'
import SearchBar from '../searchbar/searchbar.jsx'
import './home.css'

const Home = () => {
  return (
    <div className="home">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <h1>HipHopHierarchy</h1>
        <p>
          Welcome to HipHopHierarchy! Dive into our unique fan-based platform that allows you 
          to explore, rank, and dissect tracks and artists from Spotify's 
          Streamed Songs. Discover how fan favorites differ from mainstream 
          rankings and join the community today!
        </p>
      </header>
      <SearchBar />
    </div>
  )
}

export default Home
