import logo from '../resorce/placeholder.png'
import SearchBar from '../searchbar/searchbar.jsx'
import './home.css'

const Home = () => {
  return (
    <div className="home">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <h1>xxxxx</h1>
        <p>
          Welcome to Hip Hop Unleashed, the platform for hip hop fans to
          explore, rate, and rank their favorite tracks. Discover how fan
          favorites differ from mainstream rankings and join the community
          today!
        </p>
      </header>

      <SearchBar />
    </div>
  )
}

export default Home
