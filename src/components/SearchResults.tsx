import React from 'react';
import GistForks from './GistForks';
import GIST_TYPES from '../constants/gistTypes';
import './SearchResults.css';

const SearchResults = (props: any) => {
  const { results } = props;

  return (
    <>
      {results.length && (
        <>
          {results.map((gist: any) => (
            <div key={gist.id} className="gist--section">
              <small className="gist--description">{gist.description || '(no description)'}</small>
              {Object.keys(gist.files).map((file: any) => (
                <div key={gist.files[file].raw_url} className="gist--item">
                  <a href={gist.files[file].raw_url} target="_blank" rel="noopener noreferrer">
                    <span>{gist.files[file].filename}</span>
                  </a>
                  <div className="gist--bubble-wrapper">
                    <span className="gist--bubble" style={{ backgroundColor: GIST_TYPES[gist.files[file].language] || '#ccc' }} />
                    <span className="gist--bubble-description">{ gist.files[file].language || 'Other' }</span>
                  </div>
                </div>
              ))}
              <GistForks gistId={gist.id} />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default SearchResults;
