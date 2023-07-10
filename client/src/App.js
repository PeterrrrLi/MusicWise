import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Home from './home/home'
import NavBar from './navbar/navbar'
import RankPage from './rankpage/rankpage';
import Top10Songs from './top10Songs/top10Songs';
import Top10Artists from './top10Artists/top10Artists';
import AllSongs from './allSongs/allSongs';
import useSearch from './hooks/useSearch'; 

function SearchResult({ item }) {
  return (
    <div>
      {item.music_title || item.artist_name}
    </div>
  );
}

export default function App() {
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');  // New state variable
  const searchResult = useSearch(searchTerm);  // Use searchTerm here

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed, searching for:', search);  // Modify this line
      setSearchTerm(search);
    }
  };
  
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="top10Songs" element={<Top10Songs />} />
          <Route path="top10Artists" element={<Top10Artists />} />
          <Route path="allSongs" element={<AllSongs />} />
        </Routes>
      </BrowserRouter>
      {searchResult.data && searchResult.data.map(item => (
        <SearchResult key={item.music_ID} item={item} />
      ))}
    </div>

  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);