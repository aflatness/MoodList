import React, { useState } from 'react';
import axios from 'axios';
import { addPlaylist, playerControl, createPlaylist, addSongs } from '../controllers';
import { Modal, Button } from 'react-bootstrap';


const Results = ({ results, accessToken, player, userId, increment, setUser, dbID }) => {
  const [show, setShow] = useState(false);

  const playSongs = async () => {
    const tracks = results.map(v => v.uri);
    const { data } = await createPlaylist(accessToken, userId, increment);
    const url = data.external_urls.spotify;
    const created = await addSongs(accessToken, data.id, tracks);

    axios.put(`https://moodlist-heroku.herokuapp.com/api/playlists/${dbID}`, {url})
      .then(({ data }) => {
        data.moodHistory.reverse();
        setUser(data)
      })
      .catch(console.log);

    document.getElementById('results-grid').insertAdjacentHTML('beforeend', `<div id='spotify-embed'><iframe src="https://open.spotify.com/embed/playlist/${data.id}" width="70%" height="85%" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`);

    const addBtn = document.getElementById('results-add-playlist');
    addBtn.disabled = true;
    addBtn.innerHTML = 'Playlist created!';
    addBtn.style.color = '#0e5527'

    playerControl([`spotify:playlist:${data.id}`], player);
  }

  const addPlaylist = () => {
    setShow(false)
    playSongs();
  }

  return (
    <div id='results' >
      <div id='results-title'>Your playlist
        {!results.length ? '' : <button id='results-add-playlist' onClick={() => setShow(true)}>Add and play playlist</button>}
      </div>
      <div id='results-grid'>
        <div id='results-container'>
          {results.length === 0 ? 'No matching results. Try again.' : results.map((t, i) => {
            const { name, preview_url, id, artists, album } = t;
            const albumImg = album.images[2].url;
            return (
              <div className='result-row' key={i} >
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
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        animation
      >
        <Modal.Header>
          <Modal.Title>Create playlist confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>MoodList will save this playlist to your Spotify profile and then start playing it in the browser. <br /><br />Would you like to continue?</Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={addPlaylist} >Save playlist</Button>
          <Button variant='danger' onClick={() => setShow(false)} >Exit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Results;
