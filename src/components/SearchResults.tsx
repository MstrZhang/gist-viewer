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
          {results.map((gist: any, index: number) => (
            <div key={`gist-${index}`} className="gist--section">
              <small className="gist--description">{gist.description || '(no description)'}</small>
              {Object.keys(gist.files).map((file: any, fileIndex: number) => (
                <div key={`gistfile-${fileIndex}`} className="gist--item">
                    <small className="gist--badge" style={{ backgroundColor: GIST_TYPES[gist.files[file].language] || '#ccc' }}>
                      {gist.files[file].language || 'Other'}
                    </small>
                    &nbsp;
                    <a href={gist.files[file].raw_url} target="_blank" rel="noopener noreferrer">
                      <span>{gist.files[file].filename}</span>
                    </a>
                  </div>
              ))}
              <GistForks gistId={gist.id} />
            </div>
          ))}
        </>
      )}
    </>
  )
}

export default SearchResults;