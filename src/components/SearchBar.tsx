import React, { useState } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';

const SearchBar = () => {
  const [username, setUsername] = useState('');
  const [gists, setGists] = useState([]);

  /**
   * Given a GitHub username, searches for gists associated to the user
   */
  const searchByUsername = () => {
    axios.get(`https://api.github.com/users/${username}/gists`, {
      headers: {'Authorization': process.env.GITHUB_PERSONAL_ACCESS_TOKEN},
    })
    .then((res) => {
      setGists(res.data);
    });
  }

  return (
    <>
      <div>
        <input type="text" name="searchBar" onChange={(event) => setUsername(event.target.value)} placeholder="Enter a GitHub username ..." />
        <button type="button" onClick={() => searchByUsername()}>Submit</button>
      </div>
      {
        // when the list of gists is updated, pass the result to the SearchResults component
        gists.length > 0 ? <SearchResults results={gists} /> : <div>No gists found ...</div>
      }
    </>
  )
}

export default SearchBar;