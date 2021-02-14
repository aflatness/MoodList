import React from 'react';
import { addPlaylist, playerControl } from '../controllers';
import initializePlayer from '../controllers/initializePlayer.js'

const Results = ({ results, accessToken, player }) => {

  const playSongs = () => {
    const tracks = results.map(v => v.uri);
    playerControl(tracks, player)
  }

  const addPlaylist = () => {
    //Create button to allow user to add playlist to profile on spotify
  }

  return (
    <div id='results' >
      <div id='results-title'>Your playlist
        {!results.length ? '' : <button id='results-add-playlist' onClick={playSongs}>Play playlist</button>}
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