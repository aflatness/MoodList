const axios = require('axios');

const addSongs = (accessToken, playlist_id, uris) => {
  return axios.post(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, JSON.stringify({ uris }), {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
}

module.exports = addSongs;