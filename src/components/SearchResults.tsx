import React from 'react';
import GistForks from './GistForks';
import GIST_TYPES from '../constants/gistTypes';

const SearchResults = (props: any) => {
  const { results } = props;

  return (
    <>
      {results.length && (
        <>
          {results.map((gist: any, index: number) => (
            <div key={`gist-${index}`} style={{ border: '1px solid #000', marginTop: '10px', marginBottom: '10px', padding: '10px', maxWidth: '600px', wordWrap: 'break-word' }}>
              <small style={{ fontWeight: 'bold' }}>{`#${index}`} - {gist.description || '(no description)'}</small>
              {Object.keys(gist.files).map((file: any, fileIndex: number) => (
                <div key={`gistfile-${fileIndex}`} style={{ margin: '5px 0' }}>
                    <small style={{ backgroundColor: GIST_TYPES[gist.files[file].language] || '#ccc', padding: '3px', borderRadius: '3px' }}>
                      {gist.files[file].language || 'Other'}
                    </small>
                    &nbsp;
                    <a href={gist.files[file].raw_url} target="_blank" rel="noopener noreferrer">
                      <span style={{ fontSize: '14px' }}>{gist.files[file].filename}</span>
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