import React from 'react';
import { addPlaylist } from '../controllers';

const Results = ({ results, accessToken }) => {

  const addSongs = () => {

  }

  return (
    <div id='results' >
      <div id='results-title'>Your playlist
        {results.lengfth === 0 ? '' : <button id='results-add-playlist' onClick={addSongs}>Add Playlist</button>}
      </div>
      <div id='results-container'>
        {results.length === 0 ? 'No matching results. Try again.' : results.map(t => {
          const { name, preview_url, id, artists, album } = t;
          const albumImg = album.images[2].url;
          return (
            <div className='result-row' >
              <img className='result-img' src={albumImg} alt=''></img>
              <div className='result-info'>
                <div className='result-name'>{name}</div>
                <div className='result-artists' >{artists.reduce((m, v, i) => {
                  return i < artists.length - 1 ? `${v.name}, ` : `${v.name}`;
                }, '')}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Results;