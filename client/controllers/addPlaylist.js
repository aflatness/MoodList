const axios = require('axios');

const addPlaylist = (tracks, accessToken) => {
  //	https://api.spotify.com/v1/users/{user_id}/playlists
  return axios.get(`https://api.spotify.com/v1/audio-features?ids=${tracks}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
}
module.exports = addPlaylist;