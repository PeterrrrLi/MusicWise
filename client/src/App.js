import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Home from './home/home'
import NavBar from './navbar/navbar'
import RankPage from './rankpage/rankpage';
import FanRankTable from './components/fanRankTable';

export default function App() {
  
  const [search, setSearch] = useState('');

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    console.log('Searching for:', search);
    //  call API to get the search results
  };

  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="rank" element={<FanRankTable />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);