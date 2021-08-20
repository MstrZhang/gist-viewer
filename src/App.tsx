import React from 'react';
import SearchBar from './components/SearchBar';
import './App.css';
import axios from 'axios';

const App = () => {
  axios.defaults.headers.common['Authorization'] = `token ${process.env.REACT_APP_GITHUB_TOKEN}`;

  return (
    <SearchBar />
  );
}

export default App;
