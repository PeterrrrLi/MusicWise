const SearchBar = () => {
  return (
    <main>
      {' '}
      <div className="search-container">
        <input
          className="search-bar"
          type="text"
          //   value={}
          //   onChange={}
          placeholder="Search for an artist or song..."
        />
      </div>{' '}
    </main>
  )
}

export default SearchBar
