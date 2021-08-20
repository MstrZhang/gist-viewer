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
      setForkList(res.data.slice(0, 3).map((fork: any) => fork = {
        username: fork.owner.login,
        avatar: fork.owner.avatar_url,
        forkUrl: fork.html_url,
      }));
    })
  }, [gistId]);

  return (
    <div>
      {forkList.length > 0 && (
        <>
          {forkList.map((fork: any, index: number) => (
            <a key={`fork-${index}`} href={fork.forkUrl} target="_blank" rel="noopener noreferrer">
              <img className="avatar" src={fork.avatar} alt={fork.username} />
            </a>
          ))}
        </>
      )}
    </div>
  )
}

export default GistForks;