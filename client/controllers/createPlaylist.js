const axios = require('axios');

const createPlaylist = (accessToken, userId, Increment) => {
  return axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    name: `MoodList ${Increment}`,
    description: 'MoodList currated playlist',
    public: false
  },
  {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
}

module.exports = createPlaylist;