import React from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
  axios.defaults.headers.common.Authorization = `token ${process.env.REACT_APP_GITHUB_TOKEN}`;

  return (
    <div data-testid="app" className="container">
      <SearchBar />
    </div>
  );
};

export default App;
