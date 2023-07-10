import React, { useState } from 'react';
import useSearch from '../hooks/useSearch';
import './searchbar.css';

function SearchResult({ item }) {
  return (
    <div className="search-result">
      {item.music_title || item.artist_name}
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
        {searchResult.data && searchResult.data.map((item, index) => (
          <SearchResult key={index} item={item} />
        ))}
      </div>
    </main>
  )
}

export default SearchBar;