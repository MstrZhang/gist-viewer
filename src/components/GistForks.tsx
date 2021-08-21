import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GistForks.css';

const GistForks = (props: any) => {
  const { gistId } = props;

  const [forkList, setForkList] = useState([]);

  /**
   * Given a gist ID, finds the 3 latest forks of the given gist
   * If there are more than 3 latest forks, the list is truncated to only include the latest 3
   */
  useEffect(() => {
    axios.get(`https://api.github.com/gists/${gistId}/forks`)
      .then((res) => {
        // this works because GitHub orders forks in chronological order
        setForkList(res.data.slice(0, 3).map((fork: any) => ({
          username: fork.owner.login,
          avatar: fork.owner.avatar_url,
          forkUrl: fork.html_url,
          forkId: fork.id,
        })));
      });
  }, [gistId]);

  return (
    <>
      {forkList.length > 0 && (
        <div className="forks--wrapper">
          {forkList.map((fork: any) => (
            <a key={fork.forkId} href={fork.forkUrl} target="_blank" rel="noopener noreferrer">
              <img className="avatar" src={fork.avatar} alt={fork.username} />
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default GistForks;
