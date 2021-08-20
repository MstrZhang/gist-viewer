import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchPagination = (props: any) => {
  const { username, check, onPageChange } = props;

  // note: github gist API starts page at 1
  const [currentPage, setCurrentPage] = useState(1);
  const [enableNext, setEnableNext] = useState(false);

  /**
   * Checks whether or not the next page contains any data
   *  - if it does, enables the Next button; disables it otherwise
   */
  useEffect(() => {
    // only run this effect if there are some gists rendered already (i.e. a search has been done on a user already)
    if (check) {
      axios.get(`https://api.github.com/users/${username}/gists`, {
        params: {
          page: currentPage + 1,
          per_page: 10,
        },
      })
      .then((res: any) => {
        setEnableNext(res.data.length > 0);
      })
    }
  }, [check, currentPage, username]);

  /**
   * Reset the current page flag if a new search has been performed (i.e. the username changes)
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [username]);

  return (
    <div>
      <button type="button" disabled={!(currentPage > 1)} onClick={() => {
        onPageChange(currentPage - 1);
        setCurrentPage((prevState: number) => prevState -= 1);
      }}>Prev</button>
      <button type="button" disabled={!enableNext} onClick={() => {
        onPageChange(currentPage + 1);
        setCurrentPage((prevState: number) => prevState += 1);
      }}>Next</button>
    </div>
  )
}

export default SearchPagination;