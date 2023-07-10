import React, { useState } from 'react';

// function SearchResult({ item }) {
//   return (
//     <div>
//       {item.music_title || item.artist_name}
//     </div>
//   );
// }

const SearchBar = () => {

  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); 
  // const searchResult = useSearch(searchTerm);

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed, searching for:', search);
      setSearchTerm(search);
    }
  };


  // {searchResult.data && searchResult.data.map(item => (
  //   <SearchResult key={item.music_ID} item={item} />
  // ))}

  return (
    <main>
      {' '}
      <div className="search-container">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          placeholder="Search for an artist or song..."
        />
      </div>{' '}
    </main>
  )
}

export default SearchBar;
