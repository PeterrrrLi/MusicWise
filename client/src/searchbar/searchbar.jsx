import React, { useState } from 'react';
import useSearch from '../hooks/useSearch';
import './searchbar.css';

function SearchResult({ item }) {
  return (
    <div className="search-result">
      <p>Music ID: {item.music_ID}</p>
      <p>Music Title: {item.music_title}</p>
      <p>Artist Name: {item.artist_name}</p>
    </div>
  );
}

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); 
  const searchResult = useSearch(searchTerm);

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed, searching for:', search);
      setSearchTerm(search);
    }
  };

  return (
    <main>
      <div className="search-container">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          placeholder="Search for an artist or song..."
        />
        {searchResult.isLoading && <p className="loading">Loading...</p>}
        {searchResult.error && <p className="error">Sorry, an error occurred: {searchResult.error.message}</p>}
        {searchResult.data && searchResult.data.map((item) => (
          <SearchResult key={item.music_ID} item={item} />
        ))}
      </div>
    </main>
  )
}

export default SearchBar;
