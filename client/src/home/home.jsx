import logo from '../resorce/placeholder.png'
import SearchBar from '../searchbar/searchbar.jsx'
import './home.css'

const Home = () => {
  return (
    <div className="home">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <h1>HipHopHierarchy</h1>
        <p>
          Welcome to HipHopHierarchy, the platform for hip hop fans to
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
