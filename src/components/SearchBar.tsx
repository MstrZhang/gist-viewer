import React, { useState } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';
import SearchPagination from './SearchPagination';
import './SearchBar.css';

const SearchBar = () => {
  const [username, setUsername] = useState('');
  // store the current user (i.e. the user after a search has been performed)
  // so pagination doesn't constantly poll on change
  const [currentUser, setCurrentUser] = useState('');
  const [gists, setGists] = useState([]);
  const [message, setMessage] = useState('No gists found ...');

  /**
   * Given a GitHub username, searches for gists associated to the user
   */
  const searchByUsername = (page = 1) => {
    axios.get(`https://api.github.com/users/${username}/gists`, {
      params: {
        page,
        // limit the number of results per page for rate limiting purposes (forks API is costly)
        per_page: 10,
      },
    }).then((res) => {
      setGists(res.data);
    }).catch((err) => {
      if (err.response!.status === 404) {
        // username cannot be found
        setMessage(`User ${username} does not exist ...`);
        setGists([]);
      } else if (err.response!.status === 403) {
        // API is rate limited
        setMessage('You have reached the GitHub API rate limit. Consider using a personal access token or wait for 1 hour ...');
        setGists([]);
      }
    });
  };

  return (
    <>
      <div>
        <input type="text" name="searchBar" onChange={(event) => setUsername(event.target.value)} placeholder="Enter a GitHub username ..." />
        <button
          type="button"
          className="button--primary"
          onClick={() => {
            searchByUsername();
            setCurrentUser(username);
          }}
        >
          Submit
        </button>
      </div>
      {
        // when the list of gists is updated, pass the result to the SearchResults component
        gists.length > 0 ? <SearchResults results={gists} /> : <div className="gist--caption">{message}</div>
      }
      <SearchPagination
        username={currentUser}
        check={gists.length > 0}
        onPageChange={(page: number) => searchByUsername(page)}
      />
    </>
  );
};

export default SearchBar;
